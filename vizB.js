const DICIONARIO_B = {
    '0': [0,0,1,1,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,1,1,1,0,0],
    '1': [0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0],
    '2': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    '3': [0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0],
    '4': [1,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1],
    '5': [1,0,0,1,0,0,1,0,1,0,1,0,1,0,0,0,1,1,1,0,0,0,0,0,1,0,0,0,0,0,1,1,1,0,0,0,1,0,1,0,1,0,1,0,0,1,0,0,1],
    '6': [1,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,1,1,1,1,1,1,1,0,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1],
    '7': [1,0,0,1,0,0,1,0,1,0,1,0,1,0,0,0,1,1,1,0,0,1,1,1,1,1,1,1,0,0,1,1,1,0,0,0,1,0,1,0,1,0,1,0,0,1,0,0,1],
    '8': [1,0,0,1,1,1,1,0,1,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,0,1,0,1,0,0,0,1,0,0,1,1,1,1],
    '9': [1,1,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1]
};

const VOGAIS_ANTERIORES_B = {
    'A': [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    'E': [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    'I': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
    'O': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0]
};

const VOGAIS_POSTERIORES_B = {
    'A': [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    'E': [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    'I': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
    'O': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]
};

const BANCO_PALAVRAS_B = [
    "gato", "rato", "pato", "foca", "cao", "lobo", "vaca", "cobra", "tigre", "leao",
    "veado", "burro", "porco", "sapo", "grilo", "peixe", "furao", "cisne", "girafa", "pombo",
    "cabra", "ovelha", "ganso", "raposa", "bode", "zebra", "hiena", "corvo", "lince", "lontra",
    "orca", "ra", "toupeira", "mosca", "baleia", "tubarao", "coelho", "peru",
    "padeiro", "pintor", "cantor", "medico", "bombeiro", "professor", "juiz",
    "jardineiro", "pescador", "ator", "piloto", "policia", "taxista", "carteiro",
    "carpinteiro", "cientista", "cozinheiro", "dentista", "enfermeiro", "engenheiro",
    "marinheiro", "mecanico", "pedreiro", "motorista", "barbeiro", "soldado",
    "mesa", "cadeira", "livro", "caneta", "lapis", "copo", "prato", "faca", "garfo",
    "colher", "panela", "chave", "porta", "relogio", "telefone", "almofada", "vassoura",
    "pente", "escova", "toalha", "tesoura", "regua", "mochila", "sapato", "camisa",
    "calca", "casaco", "bone", "oculos", "mala", "lanterna", "martelo", "prego",
    "escada", "balde", "tapete", "cortina", "travesseiro", "cobertor", "frigideira",
    "computador", "tablet", "bule", "sacola", "anel", "pulseira", "brinco",
    "bom dia", "boa tarde", "tudo bem", "como vai", "obrigado", "ate logo",
    "por favor", "com licenca", "feliz natal", "bom ano"
];

function _converterTextoParaSistemaMajor_B(texto) {
    let resultado = texto
        .replace(/[çÇ]/g, '0')
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    resultado = resultado.replaceAll('CH', '6');
    resultado = resultado.replaceAll('LH', '5');
    resultado = resultado.replaceAll('NH', '2');
    resultado = resultado.replaceAll('RR', '4');
    resultado = resultado.replaceAll('Y', 'I');
    resultado = resultado.replaceAll('U', 'O');

    resultado = resultado.replaceAll('CE', '0E');
    resultado = resultado.replaceAll('CI', '0I');
    resultado = resultado.replaceAll('GE', '6E');
    resultado = resultado.replaceAll('GI', '6I');

    const consoantes = {
        'S': '0', 'Z': '0',
        'T': '1', 'D': '1',
        'N': '2',
        'M': '3',
        'R': '4',
        'L': '5',
        'J': '6', 'X': '6',
        'K': '7', 'Q': '7', 'C': '7', 'G': '7',
        'F': '8', 'V': '8',
        'P': '9', 'B': '9'
    };

    for (let [chave, valor] of Object.entries(consoantes)) {
        resultado = resultado.replaceAll(chave, valor);
    }

    resultado = resultado.replace(/[^AEIO0-9\s]/g, '');
    return resultado;
}

function _aplicarVogal_B(gridBase, gridVogal, estadoVogal) {
    let resultado = [...gridBase];
    for (let i = 0; i < 49; i++) {
        if (gridVogal[i] === 1) {
            resultado[i] = estadoVogal;
        }
    }
    return resultado;
}

function _extrairOriginal_B(bruto, blocos) {
    const charMap = [];
    for (let i = 0; i < bruto.length; i++) {
        let ch = bruto[i];
        if (ch === '\u00E7' || ch === '\u00C7') {
            charMap.push({ orig: i, ch: '0', isCedilha: true });
            continue;
        }
        let norm = ch.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
        if (norm.length === 1) {
            charMap.push({ orig: i, ch: norm });
        }
    }

    const digrafos = { 'CH': '6', 'LH': '5', 'NH': '2', 'RR': '4' };
    const consoantes = {
        'S': '0', 'Z': '0', 'T': '1', 'D': '1', 'N': '2', 'M': '3', 'R': '4',
        'L': '5', 'J': '6', 'X': '6', 'K': '7', 'Q': '7', 'C': '7', 'G': '7',
        'F': '8', 'V': '8', 'P': '9', 'B': '9'
    };
    const vogais = new Set(['A', 'E', 'I', 'O', 'U', 'Y']);
    const contextual = { 'CE': '0', 'CI': '0', 'GE': '6', 'GI': '6' };

    const silabas = [];
    let pos = 0;

    for (let bloco of blocos) {
        let bIdx = 0;

        while (bIdx < bloco.length && pos < charMap.length) {
            const bCh = bloco[bIdx];
            const cur = charMap[pos];

            if (!cur.isCedilha && !vogais.has(cur.ch) && !consoantes[cur.ch] && cur.ch !== 'H') {
                pos++;
                continue;
            }

            if (/[0-9]/.test(bCh)) {
                if (cur.isCedilha && bCh === '0') {
                    pos += 1;
                    bIdx++;
                    continue;
                }
                const nextCh = (pos + 1 < charMap.length) ? charMap[pos + 1].ch : '';
                const pair = cur.ch + nextCh;
                if (digrafos[pair] === bCh) {
                    pos += 2;
                } else if (contextual[pair] === bCh) {
                    pos += 1;
                } else {
                    pos += 1;
                }
                bIdx++;
            } else {
                pos++;
                bIdx++;
            }
        }
    }

    let pos2 = 0;
    for (let bloco of blocos) {
        let startOrig = pos2 < charMap.length ? charMap[pos2].orig : bruto.length;
        let bIdx = 0;
        while (bIdx < bloco.length && pos2 < charMap.length) {
            const bCh = bloco[bIdx];
            const cur = charMap[pos2];
            if (!cur.isCedilha && !vogais.has(cur.ch) && !consoantes[cur.ch] && cur.ch !== 'H') { pos2++; continue; }
            if (/[0-9]/.test(bCh)) {
                const nextCh = (pos2 + 1 < charMap.length) ? charMap[pos2 + 1].ch : '';
                const pair = cur.ch + nextCh;
                if (cur.isCedilha && bCh === '0') { pos2 += 1; bIdx++; continue; }
                if (digrafos[pair] === bCh) pos2 += 2; else if (contextual[pair] === bCh) pos2 += 1; else pos2 += 1;
                bIdx++;
            } else { pos2++; bIdx++; }
        }
        let endOrig = pos2 < charMap.length ? charMap[pos2].orig : bruto.length;
        silabas.push(bruto.slice(startOrig, endOrig).toLowerCase());
    }

    return silabas;
}

export class VisualizadorTipoB {
    constructor(containerEl) {
        this.container = containerEl;
        this.palavraAtual = '';
        this.inputAtual = '';
        this.editorState = new Array(49).fill(0);

        this._cacheRefs();
        this._initEditor();
        this._initColorControls();
        this._bindTabs();
        this._bindExport();
        this._bindGame();
        this._novaPalavra();
    }

    _q(sel) { return this.container.querySelector(sel); }

    _cacheRefs() {
        this.editorGrid = this._q('#editor-grid-b');
        this.arrayOutput = this._q('#array-output-b');
        this.debugOutput = this._q('#debug-output-b');
        this.wordContainer = this._q('#word-container-b');

        this.tabEditor = this._q('#editor-b');
        this.tabTester = this._q('#tester-b');
        this.tabJogo = this._q('#jogo-b');

        this.gameBlocks = this._q('#game-blocks-b');
        this.gameInput = this._q('#game-input-b');
        this.gameFeedback = this._q('#game-feedback-b');
        this.gameSolution = this._q('#game-solution-b');
    }

    _initEditor() {
        const self = this;
        this.editorGrid.innerHTML = '';
        for (let i = 0; i < 49; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell-b');
            cell.addEventListener('click', () => {
                self.editorState[i] = self.editorState[i] === 0 ? 1 : 0;
                cell.classList.toggle('active');
                self._updateOutput();
            });
            this.editorGrid.appendChild(cell);
        }
        this._q('#btn-copy-array-b').addEventListener('click', () => {
            navigator.clipboard.writeText(this.arrayOutput.innerText);
        });
    }

    _updateOutput() {
        this.arrayOutput.innerText = `[${this.editorState.join(',')}]`;
    }

    _initColorControls() {
        const self = this;
        const defs = {
            '--bg-color': '#f4f4f9', '--content-bg': '#ffffff',
            '--grid-empty': '#e0e0e0', '--grid-filled': '#2c3e50', '--grid-vowel': '#e74c3c',
            '--cell-radius': '3px', '--cell-size': '30px', '--cell-gap': '2px',
            '--blocks-per-line': '6', '--block-gap': '15px', '--block-row-gap': '15px'
        };

        function load() {
            for (let k in defs) {
                const v = localStorage.getItem('vizb-' + k) || defs[k];
                self.container.style.setProperty(k, v);
            }
        }

        load();

        const ids = { page: 'color-page-b', box: 'color-box-b', empty: 'color-empty-b', filled: 'color-filled-b', vowel: 'color-vowel-b' };
        const vars = { page: '--bg-color', box: '--content-bg', empty: '--grid-empty', filled: '--grid-filled', vowel: '--grid-vowel' };
        for (let key in ids) {
            const inp = this._q('#' + ids[key]);
            const varn = vars[key];
            const compStyle = getComputedStyle(this.container);
            inp.value = compStyle.getPropertyValue(varn).trim();
            inp.addEventListener('input', () => {
                self.container.style.setProperty(varn, inp.value);
                localStorage.setItem('vizb-' + varn, inp.value);
            });
        }

        function bindSlider(sliderId, valId, cssVar) {
            const s = self._q('#' + sliderId);
            const v = self._q('#' + valId);
            const compStyle = getComputedStyle(self.container);
            let val = compStyle.getPropertyValue(cssVar).trim() || defs[cssVar] || '3px';
            let num = parseInt(val) || 3;
            s.value = num;
            v.textContent = num;
            s.addEventListener('input', () => {
                const newVal = s.value + 'px';
                self.container.style.setProperty(cssVar, newVal);
                localStorage.setItem('vizb-' + cssVar, newVal);
                v.textContent = s.value;
            });
        }

        bindSlider('radius-slider-b', 'radius-val-b', '--cell-radius');
        bindSlider('size-slider-b', 'size-val-b', '--cell-size');
        bindSlider('perline-slider-b', 'perline-val-b', '--blocks-per-line');
        bindSlider('gap-slider-b', 'gap-val-b', '--block-gap');
        bindSlider('row-gap-slider-b', 'row-gap-val-b', '--block-row-gap');
        bindSlider('internal-slider-b', 'internal-val-b', '--cell-gap');

        const codeToggle = this._q('#legend-code-toggle-b');
        const codeStored = localStorage.getItem('vizb-show-legend-code');
        if (codeStored !== null) codeToggle.checked = codeStored === 'true';
        codeToggle.addEventListener('change', () => {
            localStorage.setItem('vizb-show-legend-code', codeToggle.checked);
            if (this._currentText) this._renderText();
        });

        const textToggle = this._q('#legend-text-toggle-b');
        const textStored = localStorage.getItem('vizb-show-legend-text');
        if (textStored !== null) textToggle.checked = textStored === 'true';
        textToggle.addEventListener('change', () => {
            localStorage.setItem('vizb-show-legend-text', textToggle.checked);
            if (this._currentText) this._renderText();
        });

        this._q('#btn-reset-b').addEventListener('click', () => {
            for (let k in defs) {
                self.container.style.setProperty(k, defs[k]);
                localStorage.removeItem('vizb-' + k);
            }
            self._q('#color-page-b').value = defs['--bg-color'];
            self._q('#color-box-b').value = defs['--content-bg'];
            self._q('#color-empty-b').value = defs['--grid-empty'];
            self._q('#color-filled-b').value = defs['--grid-filled'];
            self._q('#color-vowel-b').value = defs['--grid-vowel'];
            self._q('#radius-slider-b').value = 3;
            self._q('#radius-val-b').textContent = 3;
            self._q('#size-slider-b').value = 30;
            self._q('#size-val-b').textContent = 30;
            self._q('#perline-slider-b').value = 6;
            self._q('#perline-val-b').textContent = 6;
            self._q('#gap-slider-b').value = 15;
            self._q('#gap-val-b').textContent = 15;
            self._q('#row-gap-slider-b').value = 15;
            self._q('#row-gap-val-b').textContent = 15;
            self._q('#internal-slider-b').value = 2;
            self._q('#internal-val-b').textContent = 2;
        });
    }

    _bindTabs() {
        const self = this;
        const btnEditor = this._q('#btnTabEditor-b');
        const btnTester = this._q('#btnTabTester-b');
        const btnGame = this._q('#btnTabGame-b');

        btnEditor.addEventListener('click', () => {
            self._ativarTab(btnEditor, self.tabEditor, [btnTester, btnGame], [self.tabTester, self.tabJogo]);
        });
        btnTester.addEventListener('click', () => {
            self._ativarTab(btnTester, self.tabTester, [btnEditor, btnGame], [self.tabEditor, self.tabJogo]);
            if (self._currentText) self._renderText();
        });
        btnGame.addEventListener('click', () => {
            self._ativarTab(btnGame, self.tabJogo, [btnEditor, btnTester], [self.tabEditor, self.tabTester]);
        });
    }

    _ativarTab(activeBtn, activeTab, othersBtns, othersTabs) {
        activeBtn.classList.add('active');
        activeTab.classList.add('active');
        othersBtns.forEach(b => b.classList.remove('active'));
        othersTabs.forEach(t => t.classList.remove('active'));
    }

    _bindExport() {
        const self = this;
        this._q('#btn-export-b').addEventListener('click', () => self._exportBlocks());
    }

    _createDisplayGrid(arrayEstado) {
        const grid = document.createElement('div');
        grid.classList.add('grid-7x7-b', 'grid-display-b');

        for (let i = 0; i < 49; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell-b');

            if (arrayEstado[i] === 1) cell.classList.add('active');
            else if (arrayEstado[i] === 2) cell.classList.add('vowel-1');
            else if (arrayEstado[i] === 3) cell.classList.add('vowel-2');
            else if (arrayEstado[i] === 4) cell.classList.add('vowel-3');
            else if (arrayEstado[i] === 5) cell.classList.add('vowel-4');

            grid.appendChild(cell);
        }
        return grid;
    }

    _renderText() {
        const rawInput = this._currentText || '';
        const inputFiltrado = _converterTextoParaSistemaMajor_B(rawInput);

        if (this.debugOutput) {
            this.debugOutput.innerText = 'Código Fonético: ' + (inputFiltrado || '-');
        }

        this.wordContainer.innerHTML = '';

        const palavras = inputFiltrado.split(/\s+/);
        const palavrasOriginais = rawInput.split(/\s+/);

        for (let palavraIdx = 0; palavraIdx < palavras.length; palavraIdx++) {
            let palavra = palavras[palavraIdx];
            if (!palavra) continue;
            const originalPalavra = palavrasOriginais[palavraIdx] || '';

            const blocos = palavra.match(/[A-Z]*[0-9][A-Z]*/g) || [];
            const originais = _extrairOriginal_B(originalPalavra, blocos);

            for (let bIdx = 0; bIdx < blocos.length; bIdx++) {
                let bloco = blocos[bIdx];
                let numIndex = -1;
                for (let i = 0; i < bloco.length; i++) {
                    if (DICIONARIO_B[bloco[i]]) {
                        numIndex = i;
                        break;
                    }
                }

                if (numIndex !== -1) {
                    let charNum = bloco[numIndex];
                    let estadoAtual = [...DICIONARIO_B[charNum]];

                    let ordemAnterior = 0;
                    let ordemPosterior = 0;

                    for (let i = 0; i < bloco.length; i++) {
                        if (i === numIndex) continue;

                        let charVogal = bloco[i];

                        if (i < numIndex) {
                            if (VOGAIS_ANTERIORES_B[charVogal]) {
                                let estadoId = 2 + ordemAnterior;
                                if (estadoId > 5) estadoId = 5;
                                estadoAtual = _aplicarVogal_B(estadoAtual, VOGAIS_ANTERIORES_B[charVogal], estadoId);
                                ordemAnterior++;
                            }
                        } else {
                            if (VOGAIS_POSTERIORES_B[charVogal]) {
                                let estadoId = 2 + ordemPosterior;
                                if (estadoId > 5) estadoId = 5;
                                estadoAtual = _aplicarVogal_B(estadoAtual, VOGAIS_POSTERIORES_B[charVogal], estadoId);
                                ordemPosterior++;
                            }
                        }
                    }

                    const wrapper = document.createElement('div');
                    wrapper.classList.add('grid-wrapper-b');
                    wrapper.appendChild(this._createDisplayGrid(estadoAtual));

                    const showCode = this._q('#legend-code-toggle-b').checked;
                    const showText = this._q('#legend-text-toggle-b').checked;
                    const original = originais[bIdx] || '';

                    if (showCode) {
                        const codeCap = document.createElement('div');
                        codeCap.classList.add('grid-caption-b', 'grid-caption-code-b');
                        codeCap.textContent = '(' + bloco + ')';
                        wrapper.appendChild(codeCap);
                    }
                    if (showText && original) {
                        const textCap = document.createElement('div');
                        textCap.classList.add('grid-caption-b', 'grid-caption-text-b');
                        textCap.textContent = original;
                        wrapper.appendChild(textCap);
                    }
                    this.wordContainer.appendChild(wrapper);
                }
            }
        }
    }

    _renderGameBlocks() {
        const container = this.gameBlocks;
        container.innerHTML = '';

        const blocos = this.inputAtual.match(/[A-Z]*[0-9][A-Z]*/g) || [];

        for (let bloco of blocos) {
            let numIndex = -1;
            for (let i = 0; i < bloco.length; i++) {
                if (DICIONARIO_B[bloco[i]]) {
                    numIndex = i;
                    break;
                }
            }

            if (numIndex !== -1) {
                let charNum = bloco[numIndex];
                let estadoAtual = [...DICIONARIO_B[charNum]];

                let ordemAnterior = 0;
                let ordemPosterior = 0;

                for (let i = 0; i < bloco.length; i++) {
                    if (i === numIndex) continue;
                    let charVogal = bloco[i];
                    if (i < numIndex) {
                        if (VOGAIS_ANTERIORES_B[charVogal]) {
                            let estadoId = 2 + ordemAnterior;
                            if (estadoId > 5) estadoId = 5;
                            estadoAtual = _aplicarVogal_B(estadoAtual, VOGAIS_ANTERIORES_B[charVogal], estadoId);
                            ordemAnterior++;
                        }
                    } else {
                        if (VOGAIS_POSTERIORES_B[charVogal]) {
                            let estadoId = 2 + ordemPosterior;
                            if (estadoId > 5) estadoId = 5;
                            estadoAtual = _aplicarVogal_B(estadoAtual, VOGAIS_POSTERIORES_B[charVogal], estadoId);
                            ordemPosterior++;
                        }
                    }
                }

                const wrapper = document.createElement('div');
                wrapper.classList.add('grid-wrapper-b');
                wrapper.appendChild(this._createDisplayGrid(estadoAtual));
                container.appendChild(wrapper);
            }
        }
    }

    _pickPalavra() {
        return BANCO_PALAVRAS_B[Math.floor(Math.random() * BANCO_PALAVRAS_B.length)];
    }

    _novaPalavra() {
        this.palavraAtual = this._pickPalavra();
        this.inputAtual = _converterTextoParaSistemaMajor_B(this.palavraAtual);
        this.gameInput.value = '';
        this.gameFeedback.textContent = '';
        this.gameFeedback.className = 'game-feedback-b';
        this.gameSolution.textContent = '';
        this._renderGameBlocks();
    }

    _verificarResposta() {
        const resposta = this.gameInput.value.trim();
        const fb = this.gameFeedback;

        if (!this.palavraAtual) {
            fb.textContent = 'Clica em "Nova Palavra" primeiro.';
            fb.className = 'game-feedback-b lose';
            return;
        }

        if (!resposta) {
            fb.textContent = 'Escreve uma resposta.';
            fb.className = 'game-feedback-b lose';
            return;
        }

        if (resposta.toLowerCase() === this.palavraAtual.toLowerCase()) {
            fb.textContent = 'Correto!';
            fb.className = 'game-feedback-b win';
        } else {
            fb.textContent = 'Incorreto. Tenta de novo!';
            fb.className = 'game-feedback-b lose';
        }
    }

    _mostrarSolucao() {
        if (!this.palavraAtual) {
            this.gameSolution.textContent = 'Clica em "Nova Palavra" primeiro.';
            return;
        }
        this.gameSolution.textContent = 'Solução: ' + this.palavraAtual;
    }

    _bindGame() {
        const self = this;
        this._q('#btn-verificar-b').addEventListener('click', () => self._verificarResposta());
        this._q('#btn-nova-b').addEventListener('click', () => self._novaPalavra());
        this._q('#btn-solucao-b').addEventListener('click', () => self._mostrarSolucao());
        this.gameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') self._verificarResposta();
        });
    }

    _exportBlocks() {
        const container = this.wordContainer;
        if (!container || !container.children.length) return;
        const format = this._q('#export-format-b').value;
        const compStyle = getComputedStyle(this.container);
        const cellSizeVal = parseInt(compStyle.getPropertyValue('--cell-size')) || 30;
        const blockGapVal = parseFloat(compStyle.getPropertyValue('--block-gap')) || 15;
        const rowGapVal = parseFloat(compStyle.getPropertyValue('--block-row-gap')) || 15;
        const blocksPerLineVal = parseInt(compStyle.getPropertyValue('--blocks-per-line')) || 6;
        const wrappers = Array.from(container.querySelectorAll('.grid-wrapper-b'));
        const grids = wrappers.map(w => w.querySelector('.grid-7x7-b'));
        const innerGapVal = parseFloat(compStyle.getPropertyValue('--cell-gap')) || 2;
        const gridPixelSize = 7 * cellSizeVal + 6 * innerGapVal;
        const captionH = 14;
        const showCode = this._q('#legend-code-toggle-b').checked;
        const showText = this._q('#legend-text-toggle-b').checked;
        const captionLines = (showCode ? 1 : 0) + (showText ? 1 : 0);
        const captionHeight = captionLines * captionH;
        const cols = blocksPerLineVal;
        const rows = Math.ceil(grids.length / cols);
        const canvasW = cols * gridPixelSize + (cols - 1) * blockGapVal;
        const canvasH = rows * (gridPixelSize + captionHeight) + (rows - 1) * rowGapVal;
        const bg = compStyle.getPropertyValue('--content-bg').trim() || '#fff';
        const textColor = compStyle.getPropertyValue('--text-color').trim() || '#333';
        const inputText = (this._currentText || 'blocos').trim();
        const baseName = inputText.replace(/[\\/:*?"<>|]/g, '_');
        const self = this;

        if (format === 'svg') {
            let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasW}" height="${canvasH}" viewBox="0 0 ${canvasW} ${canvasH}">`;
            svg += `<rect width="${canvasW}" height="${canvasH}" fill="${bg}"/>`;
            grids.forEach((gridEl, idx) => {
                const r = Math.floor(idx / cols);
                const c = idx % cols;
                const ox = c * (gridPixelSize + blockGapVal);
                const oy = r * (gridPixelSize + captionHeight) + r * rowGapVal;
                const wrapper = wrappers[idx];
                const codeText = showCode ? (wrapper.querySelector('.grid-caption-code-b')?.textContent || '') : '';
                const textText = showText ? (wrapper.querySelector('.grid-caption-text-b')?.textContent || '') : '';
                const cells = gridEl.querySelectorAll('.cell-b');
                cells.forEach((cell, i) => {
                    const cx = ox + (i % 7) * (cellSizeVal + innerGapVal);
                    const cy = oy + Math.floor(i / 7) * (cellSizeVal + innerGapVal);
                    const style = getComputedStyle(cell);
                    const fill = style.backgroundColor;
                    svg += `<rect x="${cx}" y="${cy}" width="${cellSizeVal}" height="${cellSizeVal}" fill="${fill}"/>`;
                    if (cell.classList.contains('vowel-2') || cell.classList.contains('vowel-3') || cell.classList.contains('vowel-4')) {
                        svg += `<rect x="${cx}" y="${cy}" width="${cellSizeVal}" height="${cellSizeVal}" fill="none" stroke="${style.borderColor || '#e74c3c'}" stroke-width="3"/>`;
                    }
                    if (cell.classList.contains('vowel-3') || cell.classList.contains('vowel-4')) {
                        svg += `<line x1="${cx}" y1="${cy}" x2="${cx + cellSizeVal}" y2="${cy + cellSizeVal}" stroke="${style.borderColor || '#e74c3c'}" stroke-width="2"/>`;
                    }
                    if (cell.classList.contains('vowel-4')) {
                        svg += `<line x1="${cx + cellSizeVal}" y1="${cy}" x2="${cx}" y2="${cy + cellSizeVal}" stroke="${style.borderColor || '#e74c3c'}" stroke-width="2"/>`;
                    }
                });
                if (codeText) {
                    svg += `<text x="${ox + gridPixelSize / 2}" y="${oy + gridPixelSize + 12}" text-anchor="middle" font-family="monospace" font-size="12" fill="${textColor}">${codeText}</text>`;
                }
                if (textText) {
                    const lineY = oy + gridPixelSize + (codeText ? captionH + 12 : 12);
                    svg += `<text x="${ox + gridPixelSize / 2}" y="${lineY}" text-anchor="middle" font-family="monospace" font-size="12" fill="#888" font-style="italic">${textText}</text>`;
                }
            });
            svg += '</svg>';
            const blob = new Blob([svg], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = baseName + '.svg'; a.click();
            URL.revokeObjectURL(url);
            return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = canvasW; canvas.height = canvasH;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = bg; ctx.fillRect(0, 0, canvasW, canvasH);
        grids.forEach((gridEl, idx) => {
            const r = Math.floor(idx / cols);
            const c = idx % cols;
            const ox = c * (gridPixelSize + blockGapVal);
            const oy = r * (gridPixelSize + captionHeight) + r * rowGapVal;
            const wrapper = wrappers[idx];
            const codeText = showCode ? (wrapper.querySelector('.grid-caption-code-b')?.textContent || '') : '';
            const textText = showText ? (wrapper.querySelector('.grid-caption-text-b')?.textContent || '') : '';
            const cells = gridEl.querySelectorAll('.cell-b');
            cells.forEach((cell, i) => {
                const cx = ox + (i % 7) * (cellSizeVal + innerGapVal);
                const cy = oy + Math.floor(i / 7) * (cellSizeVal + innerGapVal);
                const style = getComputedStyle(cell);
                ctx.fillStyle = style.backgroundColor;
                ctx.fillRect(cx, cy, cellSizeVal, cellSizeVal);
                if (cell.classList.contains('vowel-2') || cell.classList.contains('vowel-3') || cell.classList.contains('vowel-4')) {
                    ctx.strokeStyle = style.borderColor || '#e74c3c';
                    ctx.lineWidth = 3;
                    ctx.strokeRect(cx, cy, cellSizeVal, cellSizeVal);
                }
                if (cell.classList.contains('vowel-3') || cell.classList.contains('vowel-4')) {
                    ctx.strokeStyle = style.borderColor || '#e74c3c';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(cx, cy);
                    ctx.lineTo(cx + cellSizeVal, cy + cellSizeVal);
                    ctx.stroke();
                }
                if (cell.classList.contains('vowel-4')) {
                    ctx.beginPath();
                    ctx.moveTo(cx + cellSizeVal, cy);
                    ctx.lineTo(cx, cy + cellSizeVal);
                    ctx.stroke();
                }
            });
            ctx.textAlign = 'center';
            if (codeText) {
                ctx.fillStyle = textColor;
                ctx.font = '12px monospace';
                ctx.fillText(codeText, ox + gridPixelSize / 2, oy + gridPixelSize + 12);
            }
            if (textText) {
                ctx.fillStyle = '#888';
                ctx.font = 'italic 12px monospace';
                const lineY = oy + gridPixelSize + (codeText ? captionH + 12 : 12);
                ctx.fillText(textText, ox + gridPixelSize / 2, lineY);
            }
        });
        let mime = 'image/png';
        if (format === 'jpeg') mime = 'image/jpeg';
        if (format === 'webp') mime = 'image/webp';
        const url = canvas.toDataURL(mime, 0.92);
        const a = document.createElement('a');
        a.href = url; a.download = baseName + '.' + format; a.click();
    }

    atualizarTexto(novoTexto) {
        this._currentText = novoTexto;
        if (this.tabTester.classList.contains('active')) {
            this._renderText();
        }
    }
}