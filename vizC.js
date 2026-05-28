const TAMANHO_CELULA_C = 20;
const COLUNAS_C = 9;
const LINHAS_C = 9;
const LARGURA_SVG_C = COLUNAS_C * TAMANHO_CELULA_C;
const ALTURA_SVG_C = LINHAS_C * TAMANHO_CELULA_C;

const POSICAO_COLUNA_C = { 'A': 0, 'E': 1, 'I': 2, 'O': 3, 'U': 4 };

function _tokenizar_C(textoOriginal) {
    let preprocessed = '';
    let segments = [];

    for (let i = 0; i < textoOriginal.length; i++) {
        const ch = textoOriginal[i];
        if (ch === '\u00E7' || ch === '\u00C7') {
            preprocessed += '0';
            segments.push(ch);
        } else {
            const upper = ch.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            for (let j = 0; j < upper.length; j++) {
                segments.push(ch);
                preprocessed += upper[j];
            }
        }
    }

    const tokens = [];
    let i = 0;

    const DIGRAFOS = { 'CH': '6', 'LH': '5', 'NH': '2', 'RR': '4' };
    const SUAVES = { 'CE': '0E', 'CI': '0I', 'GE': '6E', 'GI': '6I' };
    const CONSOANTES = {
        'S': '0', 'Z': '0', 'T': '1', 'D': '1', 'N': '2', 'M': '3',
        'R': '4', 'L': '5', 'J': '6', 'X': '6',
        'K': '7', 'Q': '7', 'C': '7', 'G': '7',
        'F': '8', 'V': '8', 'P': '9', 'B': '9'
    };

    while (i < preprocessed.length) {
        const c = preprocessed[i];

        if (i + 1 < preprocessed.length) {
            const pair = preprocessed.substr(i, 2);
            if (DIGRAFOS[pair] !== undefined) {
                tokens.push({ orig: segments[i] + segments[i + 1], phonetic: DIGRAFOS[pair] });
                i += 2;
                continue;
            }
            if (SUAVES[pair] !== undefined) {
                tokens.push({ orig: segments[i] + segments[i + 1], phonetic: SUAVES[pair] });
                i += 2;
                continue;
            }
        }

        if (c === 'Y') {
            tokens.push({ orig: segments[i], phonetic: 'I' });
            i++;
            continue;
        }

        if (CONSOANTES[c] !== undefined) {
            tokens.push({ orig: segments[i], phonetic: CONSOANTES[c] });
            i++;
            continue;
        }

        if (/[AEIOU]/.test(c)) {
            tokens.push({ orig: segments[i], phonetic: c });
            i++;
            continue;
        }

        if (/[0-9]/.test(c)) {
            tokens.push({ orig: segments[i], phonetic: c });
            i++;
            continue;
        }

        i++;
    }

    return tokens;
}

function _agruparEmBlocos_C(tokens) {
    const blocos = [];
    let blocoAtual = { vogaisAnteriores: [], consoante: null, vogaisPosteriores: [], textoOriginal: '' };
    let lendoPosteriores = false;

    function finalizarBloco() {
        if (blocoAtual.consoante !== null) {
            blocos.push(blocoAtual);
            blocoAtual = { vogaisAnteriores: [], consoante: null, vogaisPosteriores: [], textoOriginal: '' };
        }
    }

    for (const token of tokens) {
        for (let j = 0; j < token.phonetic.length; j++) {
            const char = token.phonetic[j];
            const orig = (j === 0) ? token.orig : '';

            if (/[0-9]/.test(char)) {
                if (blocoAtual.consoante !== null) {
                    finalizarBloco();
                }
                blocoAtual.consoante = parseInt(char, 10);
                blocoAtual.textoOriginal += orig;
                lendoPosteriores = true;
            } else if (/[AEIOU]/.test(char)) {
                if (!lendoPosteriores) {
                    blocoAtual.vogaisAnteriores.push(char);
                } else {
                    blocoAtual.vogaisPosteriores.push(char);
                }
                blocoAtual.textoOriginal += orig;
            }
        }
    }

    finalizarBloco();
    return blocos;
}

function _criarElementoSVG_C(tipo, atributos) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", tipo);
    for (let chave in atributos) {
        el.setAttribute(chave, atributos[chave]);
    }
    return el;
}

function _processarVogais_C(listaVogais) {
    const alturasFinais = { 'A': 0, 'E': 0, 'I': 0, 'O': 0, 'U': 0 };
    listaVogais.forEach((vogal, index) => {
        const v = vogal.toUpperCase();
        if (alturasFinais.hasOwnProperty(v)) {
            if ((index + 1) > alturasFinais[v]) {
                alturasFinais[v] = index + 1;
            }
        }
    });
    return alturasFinais;
}

function _desenharGrelhaBase_C(svg) {
    for (let i = 0; i <= COLUNAS_C; i++) {
        svg.appendChild(_criarElementoSVG_C('line', {
            x1: i * TAMANHO_CELULA_C, y1: 0,
            x2: i * TAMANHO_CELULA_C, y2: ALTURA_SVG_C,
            class: 'linha-grelha-c'
        }));
    }
    for (let i = 0; i <= LINHAS_C; i++) {
        svg.appendChild(_criarElementoSVG_C('line', {
            x1: 0, y1: i * TAMANHO_CELULA_C,
            x2: LARGURA_SVG_C, y2: i * TAMANHO_CELULA_C,
            class: 'linha-grelha-c'
        }));
    }
}

export class VisualizadorTipoC {
    constructor(containerEl) {
        this.container = containerEl;
        this.raioBorda = 0;
        this._cacheRefs();
        this._bindControls();
    }

    _q(sel) { return this.container.querySelector(sel); }

    _cacheRefs() {
        this.containerTexto = this._q('#containerTexto-c');
        this.raiz = this.container;
    }

    _criarBlocoSvg(dados, curvatura) {
        const svg = _criarElementoSVG_C('svg', {
            width: LARGURA_SVG_C,
            height: ALTURA_SVG_C,
            viewBox: '0 0 ' + LARGURA_SVG_C + ' ' + ALTURA_SVG_C
        });

        _desenharGrelhaBase_C(svg);

        const alturasAnt = _processarVogais_C(dados.vogaisAnteriores);
        const yOrigemAnt = 4 * TAMANHO_CELULA_C;
        const alturasPost = _processarVogais_C(dados.vogaisPosteriores);
        const yOrigemPost = 5 * TAMANHO_CELULA_C;

        for (let vogal in alturasAnt) {
            if (alturasAnt[vogal] > 0) {
                const x = POSICAO_COLUNA_C[vogal] * TAMANHO_CELULA_C;
                const topY = yOrigemAnt - (alturasAnt[vogal] * TAMANHO_CELULA_C);
                const bx = x + TAMANHO_CELULA_C;
                const by = 4 * TAMANHO_CELULA_C;

                const mx = (x + bx) / 2;
                const my = (topY + by) / 2;
                const coeff = (curvatura - 0.5);
                const distY = Math.abs(by - topY);
                const distX = TAMANHO_CELULA_C;
                const cx = mx + coeff * (distY * 0.5 + distX);
                const cy = my - coeff * distX * 0.8;

                const d = 'M ' + x + ' ' + topY + ' Q ' + cx + ' ' + cy + ', ' + bx + ' ' + by + ' L ' + x + ' ' + by + ' Z';
                svg.appendChild(_criarElementoSVG_C('path', { d: d, class: 'rampa-vogal-c' }));
            }
        }

        for (let vogal in alturasPost) {
            if (alturasPost[vogal] > 0) {
                const x = POSICAO_COLUNA_C[vogal] * TAMANHO_CELULA_C;
                const bottomY = yOrigemPost + (alturasPost[vogal] * TAMANHO_CELULA_C);
                const bx = x + TAMANHO_CELULA_C;
                const by = 5 * TAMANHO_CELULA_C;

                const mx = (x + bx) / 2;
                const my = (bottomY + by) / 2;
                const coeff = (curvatura - 0.5);
                const distY = Math.abs(by - bottomY);
                const distX = TAMANHO_CELULA_C;
                const cx = mx + coeff * (distY * 0.5 + distX);
                const cy = my + coeff * distX * 0.8;

                const d = 'M ' + x + ' ' + bottomY + ' Q ' + cx + ' ' + cy + ', ' + bx + ' ' + by + ' L ' + x + ' ' + by + ' Z';
                svg.appendChild(_criarElementoSVG_C('path', { d: d, class: 'rampa-vogal-c' }));
            }
        }

        for (let i = 0; i < dados.consoante; i++) {
            svg.appendChild(_criarElementoSVG_C('rect', {
                x: i * TAMANHO_CELULA_C,
                y: 4 * TAMANHO_CELULA_C,
                width: TAMANHO_CELULA_C,
                height: TAMANHO_CELULA_C,
                class: 'bloco-consoante-c',
                rx: this.raioBorda,
                ry: this.raioBorda
            }));
        }

        for (let vogal in alturasAnt) {
            if (alturasAnt[vogal] > 0) {
                const x = POSICAO_COLUNA_C[vogal] * TAMANHO_CELULA_C;
                svg.appendChild(_criarElementoSVG_C('line', {
                    x1: x, y1: yOrigemAnt,
                    x2: x, y2: yOrigemAnt - (alturasAnt[vogal] * TAMANHO_CELULA_C),
                    class: 'linha-vogal-c'
                }));
            }
        }

        for (let vogal in alturasPost) {
            if (alturasPost[vogal] > 0) {
                const x = POSICAO_COLUNA_C[vogal] * TAMANHO_CELULA_C;
                svg.appendChild(_criarElementoSVG_C('line', {
                    x1: x, y1: yOrigemPost,
                    x2: x, y2: yOrigemPost + (alturasPost[vogal] * TAMANHO_CELULA_C),
                    class: 'linha-vogal-c'
                }));
            }
        }

        return svg;
    }

    _bindControls() {
        const self = this;

        this._q('#toggleInput-c').addEventListener('change', function() {
            self._q('#input-c') && (self._q('#input-c').style.display = this.checked ? '' : 'none');
        });

        this._q('#toggleLegenda-c').addEventListener('change', function() {
            self.container.querySelectorAll('.legenda-bloco-c').forEach(el => {
                el.style.display = this.checked ? '' : 'none';
            });
        });

        this._q('#sliderCurvatura-c').addEventListener('input', () => {
            if (self._currentText !== undefined) self._atualizarTexto();
        });

        this._q('#sliderOpacidade-c').addEventListener('input', function() {
            const val = parseInt(this.value) / 100;
            self.container.style.setProperty('--opacidade-rampa-c', val);
            self._q('#valorOpacidade-c').textContent = this.value + '%';
        });

        this._q('#sliderArredondamento-c').addEventListener('input', function() {
            self.raioBorda = parseInt(this.value);
            self.container.style.setProperty('--raio-borda-c', self.raioBorda + 'px');
            self._q('#valorArredondamento-c').textContent = self.raioBorda + 'px';
            if (self._currentText !== undefined) self._atualizarTexto();
        });

        this._q('#btnExportar-c').addEventListener('click', () => self._exportar());
    }

    _atualizarTexto() {
        this.containerTexto.innerHTML = '';

        const curvatura = parseInt(this._q('#sliderCurvatura-c').value) / 100;
        this._q('#valorCurvatura-c').textContent = Math.round(curvatura * 100) + '%';

        const inputValue = this._currentText || '';
        const palavras = inputValue.split(/\s+/);

        palavras.forEach((palavra, index) => {
            if (palavra.length > 0) {
                const tokens = _tokenizar_C(palavra);
                const blocos = _agruparEmBlocos_C(tokens);

                blocos.forEach(bloco => {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'bloco-wrapper-c';

                    const novoSvg = this._criarBlocoSvg(bloco, curvatura);
                    wrapper.appendChild(novoSvg);

                    const legenda = document.createElement('div');
                    legenda.className = 'legenda-bloco-c';
                    legenda.textContent = bloco.textoOriginal;
                    wrapper.appendChild(legenda);

                    this.containerTexto.appendChild(wrapper);
                });

                if (index < palavras.length - 1) {
                    const espaco = document.createElement('div');
                    espaco.className = 'espaco-palavra-c';
                    this.containerTexto.appendChild(espaco);
                }
            }
        });
    }

    _obterEstilosComputados() {
        const estilo = getComputedStyle(this.container);
        return {
            corFundoCelula: estilo.getPropertyValue('--cor-fundo-celula-c').trim() || '#121212',
            corLinhaVogal: estilo.getPropertyValue('--cor-linha-vogal-c').trim() || '#2196F3',
            corConsoante: estilo.getPropertyValue('--cor-consoante-c').trim() || '#4CAF50',
            corGrelha: estilo.getPropertyValue('--cor-grelha-c').trim() || '#2a2a2a',
            opacidadeRampa: estilo.getPropertyValue('--opacidade-rampa-c').trim() || '0.2',
            raioBorda: estilo.getPropertyValue('--raio-borda-c').trim() || '0px'
        };
    }

    _svgParaStringComEstilos(svgEl, estilos, legenda) {
        const clone = svgEl.cloneNode(true);
        const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
        style.textContent =
            '.linha-grelha-c { stroke: ' + estilos.corGrelha + '; stroke-width: 1; }\n' +
            '.bloco-consoante-c { fill: ' + estilos.corConsoante + '; }\n' +
            '.linha-vogal-c { stroke: ' + estilos.corLinhaVogal + '; stroke-width: 2; stroke-linecap: butt; }\n' +
            '.rampa-vogal-c { fill: ' + estilos.corLinhaVogal + '; opacity: ' + estilos.opacidadeRampa + '; stroke: none; }';
        clone.insertBefore(style, clone.firstChild);

        const fundo = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        fundo.setAttribute('x', '0');
        fundo.setAttribute('y', '0');
        fundo.setAttribute('width', LARGURA_SVG_C);
        fundo.setAttribute('height', ALTURA_SVG_C);
        fundo.setAttribute('fill', estilos.corFundoCelula);
        if (estilos.raioBorda !== '0px') {
            fundo.setAttribute('rx', estilos.raioBorda);
            fundo.setAttribute('ry', estilos.raioBorda);
        }
        clone.insertBefore(fundo, style.nextSibling);

        if (legenda) {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', LARGURA_SVG_C / 2);
            text.setAttribute('y', ALTURA_SVG_C + 14);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('fill', '#888');
            text.setAttribute('font-size', '11');
            text.setAttribute('font-family', 'system-ui, sans-serif');
            text.textContent = legenda;
            clone.appendChild(text);
            clone.setAttribute('height', ALTURA_SVG_C + 22);
            clone.setAttribute('viewBox', '0 0 ' + LARGURA_SVG_C + ' ' + (ALTURA_SVG_C + 22));
        }
        return new XMLSerializer().serializeToString(clone);
    }

    _criarSpritesheet(svgs, legendas, callback) {
        const self = this;
        const estilos = this._obterEstilosComputados();
        const gap = 15;
        const raio = parseInt(estilos.raioBorda) || 0;
        const mostrarLegendas = this._q('#toggleLegenda-c').checked && legendas.length > 0;
        const legendaH = mostrarLegendas ? 22 : 0;

        const svgEls = [];
        const promises = [];

        for (let i = 0; i < svgs.length; i++) {
            const svg = svgs[i];
            const leg = mostrarLegendas ? legendas[i] : null;
            promises.push(new Promise((resolve) => {
                const str = self._svgParaStringComEstilos(svg, estilos, leg);
                const blob = new Blob([str], { type: 'image/svg+xml;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const img = new Image();
                img.onload = () => {
                    const svgH = ALTURA_SVG_C + (legendaH > 0 ? legendaH : 0);
                    svgEls.push({
                        img: img,
                        w: LARGURA_SVG_C + raio * 2,
                        h: svgH + raio * 2
                    });
                    URL.revokeObjectURL(url);
                    resolve();
                };
                img.src = url;
            }));
        }

        Promise.all(promises).then(() => {
            const cols = Math.min(svgEls.length, 8);
            const rows = Math.ceil(svgEls.length / cols);
            const cellW = LARGURA_SVG_C + raio * 2;
            const cellH = ALTURA_SVG_C + legendaH + raio * 2;
            const totalW = cols * cellW + (cols - 1) * gap + gap * 2;
            const totalH = rows * cellH + (rows - 1) * gap + gap * 2;

            const canvas = self._q('#canvasExportacao-c');
            canvas.width = totalW;
            canvas.height = totalH;
            const ctx = canvas.getContext('2d');
            const fundoTransparente = self._q('#toggleFundoTransparente-c').checked;
            if (!fundoTransparente) {
                ctx.fillStyle = '#1e1e1e';
                ctx.fillRect(0, 0, totalW, totalH);
            }

            svgEls.forEach((item, i) => {
                const col = i % cols;
                const row = Math.floor(i / cols);
                const x = gap + col * (cellW + gap);
                const y = gap + row * (cellH + gap);
                ctx.drawImage(item.img, x, y, cellW, cellH);
            });

            callback(canvas);
        });
    }

    _nomeBaseFicheiro() {
        const raw = (this._currentText || '').trim().replace(/\s+/g, '_');
        return raw.length > 0 ? raw : 'blocos-visuais';
    }

    _exportar() {
        const self = this;
        const formato = this._q('#formatoExportacao-c').value;
        const wrappers = this.containerTexto.querySelectorAll('.bloco-wrapper-c');
        const svgs = [];
        const legendas = [];
        wrappers.forEach(w => {
            const s = w.querySelector('svg');
            const l = w.querySelector('.legenda-bloco-c');
            if (s) { svgs.push(s); legendas.push(l ? l.textContent : ''); }
        });

        if (svgs.length === 0) return;

        const nomeBase = this._nomeBaseFicheiro();

        if (formato === 'svg') {
            this._exportarSVG(svgs, legendas, nomeBase);
        } else {
            this._criarSpritesheet(svgs, legendas, function(canvas) {
                const mime = { png: 'image/png', jpeg: 'image/jpeg', webp: 'image/webp' }[formato];
                const qualidade = (formato === 'jpeg' || formato === 'webp') ? 0.95 : undefined;

                canvas.toBlob(function(blob) {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = nomeBase + '.' + formato;
                    a.click();
                    URL.revokeObjectURL(url);
                }, mime, qualidade);
            });
        }
    }

    _exportarSVG(svgs, legendas, nomeBase) {
        const self = this;
        const estilos = this._obterEstilosComputados();
        const mostrarLegendas = this._q('#toggleLegenda-c').checked;
        let partes = [];
        svgs.forEach((svg, i) => {
            const leg = mostrarLegendas ? legendas[i] : null;
            partes.push(self._svgParaStringComEstilos(svg, estilos, leg));
        });

        const downloadPartes = (idx) => {
            if (idx >= partes.length) return;
            const blob = new Blob([partes[idx]], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = svgs.length === 1 ? nomeBase + '.svg' : nomeBase + '_' + (idx + 1) + '.svg';
            a.click();
            URL.revokeObjectURL(url);
            setTimeout(() => downloadPartes(idx + 1), 100);
        };
        downloadPartes(0);
    }

    atualizarTexto(novoTexto) {
        this._currentText = novoTexto;
        this._atualizarTexto();
    }
}