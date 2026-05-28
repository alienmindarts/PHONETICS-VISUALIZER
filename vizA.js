const PALAVRAS_JOGO_A = [
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

const REVERSE_VOGAIS_A = ['A', 'E', 'I', 'O', 'U'];
const REVERSE_CONSOANTES_A = {
    '1,1': 'T', '1,2': 'N', '1,3': 'M',
    '2,1': 'R', '2,2': 'L', '2,3': 'J',
    '3,1': 'K', '3,2': 'F', '3,3': 'P'
};

const MAP_VOGAIS_A = { 'A': 0, 'E': 1, 'I': 2, 'O': 3, 'U': 4 };
const MAP_CONSOANTES_A = {
    'T': [1, 1], 'D': [1, 1], 'N': [1, 2], 'M': [1, 3], 'R': [2, 1],
    'L': [2, 2], 'J': [2, 3], 'C': [3, 1], 'X': [2, 3], 'K': [3, 1], 'Q': [3, 1], 'G': [3, 1],
    'F': [3, 2], 'V': [3, 2], 'P': [3, 3], 'B': [3, 3], 'Ç': null, 'S': null, 'Z': null
};

function criarMatrizVazia() { return Array(5).fill(0).map(() => Array(5).fill(0)); }

export class VisualizadorTipoA {
    constructor(containerEl) {
        this.container = containerEl;
        this.suffix = '-a';

        this.cellSize = 20;
        this.gap = 3;
        this.blockMargin = 22;
        this.blockRowGap = 20;
        this.yOffsetStart = 8;
        this.blockWidth = 0;
        this.advanceX = 0;

        this.cfgPageBg = '#1a1a1a';
        this.cfgBoxBg = '#222222';
        this.cfgCellFill = '#ffffff';
        this.cfgCellEmpty = '#2a2a2a';
        this.cfgCornerRadius = 0;
        this.cfgCellSizeOverride = null;
        this.cfgGapOverride = null;
        this.cfgBlockMarginOverride = null;
        this.cfgBlockRowGapOverride = null;
        this.cfgBlocksPerRow = 0;
        this.cfgShowGuide = true;
        this.cfgGuideColor = '#555555';
        this.dirtySettings = new Set();

        this.blocosManuais = [criarMatrizVazia()];
        this.palavraAtualJogo = '';
        this.blocosJogo = [];

        this.palavrasJogo = PALAVRAS_JOGO_A;

        this._cacheRefs();
        this._updateGridSizes();
        this._bindSettingsPanel();
        this._bindTabs();
        this._bindExport();
        this._bindDrawMode();
        this._bindGameMode();
        this._bindResize();
        this._applyInitSettings();
    }

    _q(sel) {
        if (sel.includes(this.suffix)) return this.container.querySelector(sel);
        return this.container.querySelector(sel + this.suffix);
    }

    _cacheRefs() {
        this.canvasText = this._q('#canvasText');
        this.ctxText = this.canvasText.getContext('2d');
        this.canvasDraw = this._q('#canvasDraw');
        this.ctxDraw = this.canvasDraw.getContext('2d');
        this.canvasGame = this._q('#canvasGame');
        this.ctxGame = this.canvasGame.getContext('2d');

        this.tabText = this._q('#tabText');
        this.tabDraw = this._q('#tabDraw');
        this.tabGame = this._q('#tabGame');

        this.toggleInputTexto = this._q('#toggleInputTexto');
        this.toggleLegendaOriginal = this._q('#toggleLegendaOriginal');
        this.toggleTraducao = this._q('#toggleTraducao');

        this.gameInput = this._q('#gameInput');
        this.feedbackGame = this._q('#feedbackGame');
        this.progressBar = this._q('#progressBar');
        this.progressLabel = this._q('#progressLabel');
    }

    _updateGridSizes() {
        const w = window.innerWidth;
        let baseCellSize, baseGap, baseMargin, baseYOffset, baseRowGap;
        if (w < 480) {
            baseCellSize = 15; baseGap = 2; baseMargin = 10; baseYOffset = 6; baseRowGap = 14;
        } else if (w < 700) {
            baseCellSize = 17; baseGap = 2; baseMargin = 14; baseYOffset = 7; baseRowGap = 16;
        } else {
            baseCellSize = 20; baseGap = 3; baseMargin = 22; baseYOffset = 8; baseRowGap = 20;
        }

        this.cellSize = this.cfgCellSizeOverride !== null ? this.cfgCellSizeOverride : baseCellSize;
        this.gap = this.cfgGapOverride !== null ? this.cfgGapOverride : baseGap;
        this.blockMargin = this.cfgBlockMarginOverride !== null ? this.cfgBlockMarginOverride : baseMargin;
        this.blockRowGap = this.cfgBlockRowGapOverride !== null ? this.cfgBlockRowGapOverride : baseRowGap;
        this.yOffsetStart = baseYOffset;

        this.blockWidth = (5 * this.cellSize) + (4 * this.gap);
        this.advanceX = this.blockWidth + this.blockMargin;

        if (!this.dirtySettings.has('cfgCellSize')) {
            const s = this._q('#cfgCellSize');
            if (s) s.value = this.cellSize;
        }
        if (!this.dirtySettings.has('cfgGap')) {
            const s = this._q('#cfgGap');
            if (s) s.value = this.gap;
        }
        if (!this.dirtySettings.has('cfgBlockMargin')) {
            const s = this._q('#cfgBlockMargin');
            if (s) s.value = this.blockMargin;
        }
        if (!this.dirtySettings.has('cfgBlockRowGap')) {
            const s = this._q('#cfgBlockRowGap');
            if (s) s.value = this.blockRowGap;
        }
        const cornerSlider = this._q('#cfgCornerRadius');
        if (cornerSlider) {
            cornerSlider.max = Math.floor(this.cellSize / 2);
        }
        this._updateSliderLabels();
    }

    _readPanelValues() {
        this.cfgPageBg = this._q('#cfgPageBg').value;
        this.cfgBoxBg = this._q('#cfgBoxBg').value;
        this.cfgCellFill = this._q('#cfgCellFill').value;
        this.cfgCellEmpty = this._q('#cfgCellEmpty').value;
        this.cfgCornerRadius = parseInt(this._q('#cfgCornerRadius').value);
        this.cfgCellSizeOverride = this.dirtySettings.has('cfgCellSize') ? parseInt(this._q('#cfgCellSize').value) : null;
        this.cfgGapOverride = this.dirtySettings.has('cfgGap') ? parseInt(this._q('#cfgGap').value) : null;
        this.cfgBlockMarginOverride = this.dirtySettings.has('cfgBlockMargin') ? parseInt(this._q('#cfgBlockMargin').value) : null;
        this.cfgBlockRowGapOverride = this.dirtySettings.has('cfgBlockRowGap') ? parseInt(this._q('#cfgBlockRowGap').value) : null;
        this.cfgBlocksPerRow = parseInt(this._q('#cfgBlocksPerRow').value);
        this.cfgShowGuide = this._q('#cfgShowGuide').checked;
        this.cfgGuideColor = this._q('#cfgGuideColor').value;
    }

    _updateSizeOverrides() {
        if (this.cfgCellSizeOverride !== null) this.cellSize = this.cfgCellSizeOverride;
        if (this.cfgGapOverride !== null) this.gap = this.cfgGapOverride;
        if (this.cfgBlockMarginOverride !== null) this.blockMargin = this.cfgBlockMarginOverride;
        if (this.cfgBlockRowGapOverride !== null) this.blockRowGap = this.cfgBlockRowGapOverride;
        this.blockWidth = (5 * this.cellSize) + (4 * this.gap);
        this.advanceX = this.blockWidth + this.blockMargin;
    }

    _updateSliderLabels() {
        const lblCorner = this._q('#lblCornerRadius');
        if (lblCorner) lblCorner.textContent = this.cfgCornerRadius;
        const lblCellSize = this._q('#lblCellSize');
        if (lblCellSize) lblCellSize.textContent = this.cfgCellSizeOverride !== null ? this.cfgCellSizeOverride : this.cellSize;
        const lblBpr = this._q('#lblBlocksPerRow');
        if (lblBpr) lblBpr.textContent = this.cfgBlocksPerRow === 0 ? 'auto' : this.cfgBlocksPerRow;
        const lblBm = this._q('#lblBlockMargin');
        if (lblBm) lblBm.textContent = this.cfgBlockMarginOverride !== null ? this.cfgBlockMarginOverride : this.blockMargin;
        const lblGap = this._q('#lblGap');
        if (lblGap) lblGap.textContent = this.cfgGapOverride !== null ? this.cfgGapOverride : this.gap;
        const lblBrg = this._q('#lblBlockRowGap');
        if (lblBrg) lblBrg.textContent = this.cfgBlockRowGapOverride !== null ? this.cfgBlockRowGapOverride : this.blockRowGap;
    }

    _applySettings() {
        this._readPanelValues();
        this._updateSizeOverrides();
        this._updateSliderLabels();

        this.container.closest('#area-visualizadores') || this.container;
        this.container.querySelectorAll('.canvas-container-a, .canvas-scroll-area-a').forEach(el => {
            el.style.backgroundColor = this.cfgBoxBg;
        });

        const cornerSlider = this._q('#cfgCornerRadius');
        const maxR = Math.floor(this.cellSize / 2);
        if (parseInt(cornerSlider.max) !== maxR) cornerSlider.max = maxR;

        this._renderizarModoTexto(this._processarTexto(this._currentText || ''));
        this._renderizarModoManual();
        if (this.tabGame && this.tabGame.classList.contains('active')) this._renderizarJogo();
    }

    _bindSettingsPanel() {
        const btnSettings = this._q('#btnSettingsToggle');
        const panel = this._q('#settingsPanel');
        btnSettings.addEventListener('click', () => {
            const hidden = panel.classList.toggle('hidden');
            btnSettings.classList.toggle('active', !hidden);
        });
        const self = this;
        panel.querySelectorAll('input').forEach(el => {
            el.addEventListener('input', () => {
                self.dirtySettings.add(el.id);
                self._applySettings();
            });
        });
    }

    _applyInitSettings() {
        const rCorner = this._q('#cfgCornerRadius');
        rCorner.max = Math.floor(this.cellSize / 2);

        this._q('#cfgPageBg').value = this.cfgPageBg;
        this._q('#cfgBoxBg').value = this.cfgBoxBg;
        this._q('#cfgCellFill').value = this.cfgCellFill;
        this._q('#cfgCellEmpty').value = this.cfgCellEmpty;
        this._q('#cfgCellSize').value = this.cellSize;
        this._q('#cfgGap').value = this.gap;
        this._q('#cfgBlockMargin').value = this.blockMargin;
        this._q('#cfgBlockRowGap').value = this.blockRowGap;
        this._q('#cfgBlocksPerRow').value = 0;
        this._q('#cfgShowGuide').checked = this.cfgShowGuide;
        this._q('#cfgGuideColor').value = this.cfgGuideColor;
        this._updateSliderLabels();
        this.container.querySelectorAll('.canvas-container-a, .canvas-scroll-area-a').forEach(el => {
            el.style.backgroundColor = this.cfgBoxBg;
        });
    }

    _bindExport() {
        const btnExport = this._q('#btnExport');
        const exportMenu = this._q('#exportMenu');
        const self = this;

        btnExport.addEventListener('click', (e) => {
            e.stopPropagation();
            exportMenu.classList.toggle('hidden');
            btnExport.classList.toggle('active', !exportMenu.classList.contains('hidden'));
        });

        exportMenu.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const format = btn.dataset.format;
                exportMenu.classList.add('hidden');
                btnExport.classList.remove('active');

                if (format === 'svg') {
                    const ctx = self._getActiveCanvasAndBlocks();
                    if (ctx) self._exportarSVG(ctx.blocos, ctx.modo);
                } else {
                    self._exportarRaster(format);
                }
            });
        });

        document.addEventListener('click', () => {
            if (!exportMenu.classList.contains('hidden')) {
                exportMenu.classList.add('hidden');
                btnExport.classList.remove('active');
            }
        });
    }

    _getActiveCanvasAndBlocks() {
        if (this.tabText.classList.contains('active')) {
            return { canvas: this.canvasText, blocos: this._processarTexto(this._currentText || ''), modo: 'texto' };
        }
        if (this.tabDraw.classList.contains('active')) {
            return { canvas: this.canvasDraw, blocos: this.blocosManuais, modo: 'desenho' };
        }
        if (this.tabGame.classList.contains('active') && this.blocosJogo.length > 0) {
            return { canvas: this.canvasGame, blocos: this.blocosJogo, modo: 'jogo' };
        }
        return null;
    }

    _gerarNomeFicheiro(ctx) {
        if (ctx.modo === 'texto') {
            const texto = (this._currentText || '').trim();
            return texto || 'blocos';
        }
        if (ctx.modo === 'desenho') {
            const partes = this.blocosManuais.map(g => this._descodificarBloco(g)).filter(Boolean);
            return partes.length > 0 ? partes.join('_') : 'blocos';
        }
        if (ctx.modo === 'jogo') {
            return this.palavraAtualJogo || 'blocos';
        }
        return 'blocos';
    }

    _downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    _exportarRaster(format) {
        const ctx = this._getActiveCanvasAndBlocks();
        if (!ctx) return;
        const mimeMap = { png: 'image/png', jpeg: 'image/jpeg', webp: 'image/webp' };
        const mime = mimeMap[format];
        if (!mime) return;
        const quality = (format === 'jpeg' || format === 'webp') ? 0.92 : undefined;
        const self = this;
        ctx.canvas.toBlob(blob => {
            if (blob) self._downloadBlob(blob, `${self._gerarNomeFicheiro(ctx)}.${format}`);
        }, mime, quality);
    }

    _exportarSVG(blocos, modo) {
        if (!blocos || blocos.length === 0) return;
        const self = this;

        const blocksPerRow = this.cfgBlocksPerRow > 0 ? this.cfgBlocksPerRow : Math.max(1, Math.floor(800 / this.advanceX));
        const numRows = Math.ceil(blocos.length / blocksPerRow);
        const blockContentH = 5 * this.cellSize + 4 * this.gap;
        const extraForLabel = (modo === 'desenho' && this.toggleTraducao.checked) || (modo === 'texto' && this.toggleLegendaOriginal && this.toggleLegendaOriginal.checked) ? 18 : 0;
        const rowH = blockContentH + this.blockRowGap + extraForLabel;

        const SVG_PAD_LEFT = 10;
        const SVG_PAD_TOP = this.yOffsetStart;
        const SVG_PAD_RIGHT = 6;
        const SVG_PAD_BOTTOM = 4;

        const totalW = SVG_PAD_LEFT + blocksPerRow * this.advanceX + SVG_PAD_RIGHT;
        const totalH = SVG_PAD_TOP + numRows * rowH + SVG_PAD_BOTTOM;

        let svgParts = [];
        svgParts.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="${totalH}" viewBox="0 0 ${totalW} ${totalH}">`);
        svgParts.push(`<rect width="100%" height="100%" fill="${this.cfgBoxBg}" rx="8"/>`);

        const blankFill = (this.cfgCellEmpty && this.cfgCellEmpty !== 'transparent') ? this.cfgCellEmpty : 'none';

        blocos.forEach((bloco, i) => {
            const row = Math.floor(i / blocksPerRow);
            const col = i % blocksPerRow;
            const xOffset = SVG_PAD_LEFT + col * this.advanceX;
            const baseY = SVG_PAD_TOP + row * rowH;
            const grid = bloco.grid || bloco;

            for (let l = 0; l < 5; l++) {
                for (let c = 0; c < 5; c++) {
                    if (grid[l][c] === 0 && blankFill !== 'none') {
                        const xPos = xOffset + (c * (this.cellSize + this.gap));
                        const yPos = baseY + (l * (this.cellSize + this.gap));
                        const rx = this.cfgCornerRadius;
                        svgParts.push(`<rect x="${xPos}" y="${yPos}" width="${this.cellSize}" height="${this.cellSize}" rx="${rx}" fill="${blankFill}"/>`);
                    }
                }
            }

            if (this.cfgShowGuide) {
                const gx = xOffset + (this.cellSize + this.gap) + 0.5;
                const gy = baseY + (this.cellSize + this.gap) + 0.5;
                const gs = 3 * this.cellSize + 2 * this.gap - 1;
                svgParts.push(`<rect x="${gx}" y="${gy}" width="${gs}" height="${gs}" fill="none" stroke="${this.cfgGuideColor}" stroke-width="1"/>`);
            }

            for (let l = 0; l < 5; l++) {
                for (let c = 0; c < 5; c++) {
                    const estado = grid[l][c];
                    if (estado === 0) continue;
                    const xPos = xOffset + (c * (this.cellSize + this.gap));
                    const yPos = baseY + (l * (this.cellSize + this.gap));
                    const rx = this.cfgCornerRadius;
                    const cx = xPos + this.cellSize / 2;
                    const cy = yPos + this.cellSize / 2;

                    if (estado === 1 || estado === 4) {
                        svgParts.push(`<rect x="${xPos}" y="${yPos}" width="${this.cellSize}" height="${this.cellSize}" rx="${rx}" fill="${this.cfgCellFill}"/>`);
                        if (estado === 4) {
                            svgParts.push(`<circle cx="${cx}" cy="${cy}" r="3.5" fill="${blankFill === 'none' ? this.cfgBoxBg : blankFill}" stroke="${blankFill}" stroke-width="1.5"/>`);
                        }
                    } else if (estado === 2 || estado === 3) {
                        svgParts.push(`<rect x="${xPos}" y="${yPos}" width="${this.cellSize}" height="${this.cellSize}" rx="${rx}" fill="${blankFill}"/>`);
                        svgParts.push(`<rect x="${xPos}" y="${yPos}" width="${this.cellSize}" height="${this.cellSize}" rx="${rx}" fill="none" stroke="${this.cfgCellFill}" stroke-width="2"/>`);
                        if (estado === 3) {
                            svgParts.push(`<circle cx="${cx}" cy="${cy}" r="3.5" fill="${this.cfgCellFill}"/>`);
                        }
                    }
                }
            }

            if (modo === 'desenho' && this.toggleTraducao.checked) {
                const texto = this._descodificarBloco(grid);
                if (texto) {
                    const labelY = baseY + blockContentH + 14;
                    const labelSize = Math.max(11, Math.min(15, Math.floor(this.cellSize * 0.8)));
                    svgParts.push(`<text x="${xOffset + this.blockWidth / 2}" y="${labelY}" fill="#888" font-family="monospace" font-size="${labelSize}" text-anchor="middle">${texto}</text>`);
                }
            }

            if (modo === 'texto' && this.toggleLegendaOriginal && this.toggleLegendaOriginal.checked && bloco.segmentoOriginal) {
                const labelY = baseY + blockContentH + 14;
                const labelSize = Math.max(11, Math.min(15, Math.floor(this.cellSize * 0.8)));
                svgParts.push(`<text x="${xOffset + this.blockWidth / 2}" y="${labelY}" fill="#888" font-family="monospace" font-size="${labelSize}" text-anchor="middle">${bloco.segmentoOriginal}</text>`);
            }
        });

        svgParts.push('</svg>');
        const svgStr = svgParts.join('\n');
        const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
        const ctxAux = this._getActiveCanvasAndBlocks();
        this._downloadBlob(blob, `${ctxAux ? this._gerarNomeFicheiro(ctxAux) : 'blocos'}.svg`);
    }

    _bindTabs() {
        const btnText = this._q('#btnTabText');
        const btnDraw = this._q('#btnTabDraw');
        const btnGame = this._q('#btnTabGame');
        const self = this;

        btnText.addEventListener('click', () => {
            btnText.classList.add('active'); btnDraw.classList.remove('active'); btnGame.classList.remove('active');
            self.tabText.classList.add('active'); self.tabDraw.classList.remove('active'); self.tabGame.classList.remove('active');
            self._renderizarModoTexto(self._processarTexto(self._currentText || ''));
        });

        btnDraw.addEventListener('click', () => {
            btnDraw.classList.add('active'); btnText.classList.remove('active'); btnGame.classList.remove('active');
            self.tabDraw.classList.add('active'); self.tabText.classList.remove('active'); self.tabGame.classList.remove('active');
            self._renderizarModoManual();
        });

        btnGame.addEventListener('click', () => {
            btnGame.classList.add('active'); btnText.classList.remove('active'); btnDraw.classList.remove('active');
            self.tabGame.classList.add('active'); self.tabText.classList.remove('active'); self.tabDraw.classList.remove('active');
            requestAnimationFrame(() => {
                if (!self.palavraAtualJogo) self._iniciarNovaRodadaJogo(); else self._renderizarJogo();
            });
        });

        if (this.toggleInputTexto) {
            this.toggleInputTexto.addEventListener('change', () => {
                self._renderizarModoTexto(self._processarTexto(self._currentText || ''));
            });
        }
        if (this.toggleLegendaOriginal) {
            this.toggleLegendaOriginal.addEventListener('change', () => {
                self._renderizarModoTexto(self._processarTexto(self._currentText || ''));
            });
        }
    }

    _desenharFormaCelula(ctx, x, y, estado) {
        const r = this.cfgCornerRadius;
        ctx.strokeStyle = this.cfgCellFill; ctx.fillStyle = this.cfgCellFill; ctx.lineWidth = 2;

        if (estado === 0) {
            if (this.cfgCellEmpty && this.cfgCellEmpty !== 'transparent') {
                ctx.fillStyle = this.cfgCellEmpty;
                if (r > 0) { ctx.beginPath(); ctx.roundRect(x, y, this.cellSize, this.cellSize, r); ctx.fill(); }
                else { ctx.fillRect(x, y, this.cellSize, this.cellSize); }
            }
            return;
        }

        if (estado === 1 || estado === 4) {
            if (r > 0) { ctx.beginPath(); ctx.roundRect(x, y, this.cellSize, this.cellSize, r); ctx.fill(); }
            else { ctx.fillRect(x, y, this.cellSize, this.cellSize); }
        } else if (estado === 2 || estado === 3) {
            const emptyFill = (this.cfgCellEmpty && this.cfgCellEmpty !== 'transparent') ? this.cfgCellEmpty : this.cfgBoxBg;
            ctx.fillStyle = emptyFill;
            if (r > 0) { ctx.beginPath(); ctx.roundRect(x, y, this.cellSize, this.cellSize, r); ctx.fill(); }
            else { ctx.fillRect(x, y, this.cellSize, this.cellSize); }
            ctx.fillStyle = this.cfgCellFill;
            const inset = ctx.lineWidth / 2;
            if (r > 0) { ctx.beginPath(); ctx.roundRect(x + inset, y + inset, this.cellSize - ctx.lineWidth, this.cellSize - ctx.lineWidth, r); ctx.stroke(); }
            else { ctx.strokeRect(x + inset, y + inset, this.cellSize - ctx.lineWidth, this.cellSize - ctx.lineWidth); }
        }

        if (estado === 3) {
            ctx.beginPath();
            ctx.arc(x + this.cellSize / 2, y + this.cellSize / 2, 3.5, 0, Math.PI * 2);
            ctx.fill();
        }

        if (estado === 4) {
            const emptyFill = (this.cfgCellEmpty && this.cfgCellEmpty !== 'transparent') ? this.cfgCellEmpty : this.cfgBoxBg;
            ctx.strokeStyle = emptyFill;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x + this.cellSize / 2, y + this.cellSize / 2, 3.5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.strokeStyle = this.cfgCellFill;
            ctx.lineWidth = 2;
        }
    }

    _desenharEstruturaCentro(ctx, xOffset, baseY) {
        if (!this.cfgShowGuide) return;
        ctx.strokeStyle = this.cfgGuideColor;
        ctx.lineWidth = 1;
        const startX = xOffset + 1 * (this.cellSize + this.gap);
        const startY = (baseY === undefined ? this.yOffsetStart : baseY) + 1 * (this.cellSize + this.gap);
        const size = (3 * this.cellSize) + (2 * this.gap);
        const hw = ctx.lineWidth / 2;
        ctx.strokeRect(startX + hw, startY + hw, size - ctx.lineWidth, size - ctx.lineWidth);
    }

    _renderizarBlocosEmCanvas(canvas, ctx, blocos, labels = null) {
        const parent = canvas.parentElement;
        const available = Math.max(280, parent.clientWidth - 24);
        const autoPerRow = Math.max(1, Math.floor(available / this.advanceX));
        const blocksPerRow = this.cfgBlocksPerRow > 0 ? this.cfgBlocksPerRow : autoPerRow;
        const numRows = Math.ceil(Math.max(1, blocos.length) / blocksPerRow);
        const canvasW = Math.min(available, blocksPerRow * this.advanceX + 16);
        if (canvas.width !== canvasW) canvas.width = canvasW;
        const blockContentH = 5 * this.cellSize + 4 * this.gap;
        const extraHeight = labels ? 18 : 0;
        const rowH = blockContentH + this.blockRowGap + extraHeight;
        const neededH = this.yOffsetStart + numRows * rowH + 4;
        if (canvas.height !== neededH) canvas.height = neededH;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        blocos.forEach((bloco, i) => {
            const row = Math.floor(i / blocksPerRow);
            const col = i % blocksPerRow;
            const xOffset = 10 + col * this.advanceX;
            const baseY = this.yOffsetStart + row * rowH;
            for (let l = 0; l < 5; l++) {
                for (let c = 0; c < 5; c++) {
                    if (bloco.grid[l][c] === 0) {
                        const xPos = xOffset + (c * (this.cellSize + this.gap));
                        const yPos = baseY + (l * (this.cellSize + this.gap));
                        this._desenharFormaCelula(ctx, xPos, yPos, 0);
                    }
                }
            }
            this._desenharEstruturaCentro(ctx, xOffset, baseY);
            for (let l = 0; l < 5; l++) {
                for (let c = 0; c < 5; c++) {
                    const estado = bloco.grid[l][c];
                    if (estado > 0) {
                        const xPos = xOffset + (c * (this.cellSize + this.gap));
                        const yPos = baseY + (l * (this.cellSize + this.gap));
                        this._desenharFormaCelula(ctx, xPos, yPos, estado);
                    }
                }
            }
            if (labels && labels[i]) {
                ctx.fillStyle = '#888';
                const labelSize = Math.max(11, Math.min(15, Math.floor(this.cellSize * 0.8)));
                ctx.font = `${labelSize}px monospace`;
                ctx.textAlign = 'center';
                const gridBottom = baseY + blockContentH;
                ctx.fillText(labels[i], xOffset + this.blockWidth / 2, gridBottom + 14);
            }
        });
    }

    _preProcessWithMapping(texto) {
        let step1 = texto
            .replace(/[çÇ]/g, 'S')
            .toUpperCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

        let result = '';
        let consumeCount = [];
        let i = 0;
        while (i < step1.length) {
            if (i + 1 < step1.length) {
                let two = step1.substring(i, i + 2);
                if (two === 'CH') { result += 'X'; consumeCount.push(2); i += 2; continue; }
                if (two === 'LH') { result += 'L'; consumeCount.push(2); i += 2; continue; }
                if (two === 'NH') { result += 'N'; consumeCount.push(2); i += 2; continue; }
                if (two === 'RR') { result += 'R'; consumeCount.push(2); i += 2; continue; }
            }
            let c = step1[i];
            if (c === 'Y') c = 'I';
            result += c;
            consumeCount.push(1);
            i++;
        }

        let ri = 0;
        while (ri < result.length - 1) {
            let two = result.substring(ri, ri + 2);
            if (two === 'CE') { result = result.substring(0, ri) + 'SE' + result.substring(ri + 2); ri += 2; }
            else if (two === 'CI') { result = result.substring(0, ri) + 'SI' + result.substring(ri + 2); ri += 2; }
            else if (two === 'GE') { result = result.substring(0, ri) + 'JE' + result.substring(ri + 2); ri += 2; }
            else if (two === 'GI') { result = result.substring(0, ri) + 'JI' + result.substring(ri + 2); ri += 2; }
            else { ri++; }
        }

        return { processed: result, consumeCount };
    }

    _processarTexto(textoOriginal) {
        if (!textoOriginal) return [];
        const { processed: texto, consumeCount } = this._preProcessWithMapping(textoOriginal);
        const blocos = [];
        let blocoAtual = { grid: criarMatrizVazia(), hasCenter: false, hasRight: false, cLeft: 0, cCenter: 0, cRight: 0 };
        let segmentStart = 0;
        let consumedSoFar = 0;

        for (let i = 0; i < texto.length; i++) {
            const char = texto[i];

            if (char === ' ') {
                if (blocoAtual.hasCenter || blocoAtual.cLeft > 0 || blocoAtual.cRight > 0) {
                    blocoAtual.segmentoOriginal = textoOriginal.substring(segmentStart, segmentStart + consumedSoFar);
                    blocos.push(blocoAtual);
                }
                segmentStart = segmentStart + consumedSoFar + consumeCount[i];
                consumedSoFar = 0;
                blocoAtual = { grid: criarMatrizVazia(), hasCenter: false, hasRight: false, cLeft: 0, cCenter: 0, cRight: 0 };
                continue;
            }

            if (MAP_VOGAIS_A[char] !== undefined) {
                consumedSoFar += consumeCount[i];
                let linha = MAP_VOGAIS_A[char];
                if (!blocoAtual.hasCenter) {
                    blocoAtual.cLeft++; blocoAtual.grid[linha][0] = Math.min(blocoAtual.cLeft, 4);
                } else {
                    blocoAtual.hasRight = true; blocoAtual.cRight++; blocoAtual.grid[linha][4] = Math.min(blocoAtual.cRight, 4);
                }
            } else if (MAP_CONSOANTES_A[char] !== undefined || char === 'S' || char === 'Z') {
                if (blocoAtual.hasRight) {
                    blocoAtual.segmentoOriginal = textoOriginal.substring(segmentStart, segmentStart + consumedSoFar);
                    blocos.push(blocoAtual);
                    segmentStart = segmentStart + consumedSoFar;
                    consumedSoFar = 0;
                    blocoAtual = { grid: criarMatrizVazia(), hasCenter: false, hasRight: false, cLeft: 0, cCenter: 0, cRight: 0 };
                }
                consumedSoFar += consumeCount[i];
                blocoAtual.hasCenter = true; blocoAtual.cCenter++;
                const coords = MAP_CONSOANTES_A[char];
                if (coords) blocoAtual.grid[coords[0]][coords[1]] = Math.min(blocoAtual.cCenter, 4);
            }
        }
        if (blocoAtual.hasCenter || blocoAtual.cLeft > 0 || blocoAtual.cRight > 0) {
            blocoAtual.segmentoOriginal = textoOriginal.substring(segmentStart, segmentStart + consumedSoFar);
            blocos.push(blocoAtual);
        }
        return blocos;
    }

    _renderizarModoTexto(blocos) {
        const mostrarLegenda = this.toggleLegendaOriginal && this.toggleLegendaOriginal.checked;
        const labels = mostrarLegenda ? blocos.map(b => b.segmentoOriginal || '') : null;
        this._renderizarBlocosEmCanvas(this.canvasText, this.ctxText, blocos, labels);
    }

    _descodificarBloco(grid) {
        let left = [], center = [], right = [];
        let isCompletelyEmpty = true;
        let hasConsoanteCentro = false;

        for (let l = 0; l < 5; l++) {
            for (let c = 0; c < 5; c++) {
                let estado = grid[l][c];
                if (estado > 0) {
                    isCompletelyEmpty = false;
                    if (c === 0) left.push({ char: REVERSE_VOGAIS_A[l], state: estado });
                    else if (c === 4) right.push({ char: REVERSE_VOGAIS_A[l], state: estado });
                    else if (l >= 1 && l <= 3 && c >= 1 && c <= 3) {
                        center.push({ char: REVERSE_CONSOANTES_A[`${l},${c}`], state: estado });
                        hasConsoanteCentro = true;
                    }
                }
            }
        }

        if (isCompletelyEmpty) return "";

        left.sort((a, b) => a.state - b.state);
        center.sort((a, b) => a.state - b.state);
        right.sort((a, b) => a.state - b.state);

        let txtLeft = left.map(x => x.char).join('');
        let txtRight = right.map(x => x.char).join('');
        let txtCenter = hasConsoanteCentro ? center.map(x => x.char).join('') : "S";

        return txtLeft + txtCenter + txtRight;
    }

    _renderizarModoManual() {
        const parent = this.canvasDraw.parentElement;
        const available = Math.max(280, parent.clientWidth - 24);

        const autoPerRow = Math.max(1, Math.floor(available / this.advanceX));
        const blocksPerRow = this.cfgBlocksPerRow > 0 ? this.cfgBlocksPerRow : autoPerRow;
        const numRows = Math.ceil(Math.max(1, this.blocosManuais.length) / blocksPerRow);

        const canvasW = Math.min(available, blocksPerRow * this.advanceX + 16);
        if (this.canvasDraw.width !== canvasW) this.canvasDraw.width = canvasW;

        const mostrarTraducao = this.toggleTraducao.checked;
        const blockContentH = 5 * this.cellSize + 4 * this.gap;
        const extraForLabel = mostrarTraducao ? 18 : 0;
        const rowH = blockContentH + this.blockRowGap + extraForLabel;

        const neededH = this.yOffsetStart + numRows * rowH + 6;
        if (this.canvasDraw.height !== neededH) this.canvasDraw.height = neededH;

        this.ctxDraw.clearRect(0, 0, this.canvasDraw.width, this.canvasDraw.height);

        const self = this;
        this.blocosManuais.forEach((grid, i) => {
            const row = Math.floor(i / blocksPerRow);
            const col = i % blocksPerRow;

            const xOffset = 10 + col * self.advanceX;
            const baseY = self.yOffsetStart + row * (blockContentH + self.blockRowGap);

            for (let l = 0; l < 5; l++) {
                for (let c = 0; c < 5; c++) {
                    const xPos = xOffset + (c * (self.cellSize + self.gap));
                    const yPos = baseY + (l * (self.cellSize + self.gap));

                    self.ctxDraw.strokeStyle = 'rgba(255, 255, 255, 0.05)';
                    self.ctxDraw.lineWidth = 1;
                    self.ctxDraw.strokeRect(xPos, yPos, self.cellSize, self.cellSize);

                    if (grid[l][c] === 0) {
                        self._desenharFormaCelula(self.ctxDraw, xPos, yPos, 0);
                    }
                }
            }
            self._desenharEstruturaCentro(self.ctxDraw, xOffset, baseY);
            for (let l = 0; l < 5; l++) {
                for (let c = 0; c < 5; c++) {
                    const estado = grid[l][c];
                    if (estado > 0) {
                        const xPos = xOffset + (c * (self.cellSize + self.gap));
                        const yPos = baseY + (l * (self.cellSize + self.gap));
                        self._desenharFormaCelula(self.ctxDraw, xPos, yPos, estado);
                    }
                }
            }

            if (mostrarTraducao) {
                const texto = self._descodificarBloco(grid);
                self.ctxDraw.fillStyle = '#888';
                const labelSize = Math.max(11, Math.min(15, Math.floor(self.cellSize * 0.8)));
                self.ctxDraw.font = `${labelSize}px monospace`;
                self.ctxDraw.textAlign = 'center';
                const gridBottom = baseY + blockContentH;
                self.ctxDraw.fillText(texto, xOffset + (self.blockWidth / 2), gridBottom + 14);
            }
        });
    }

    _bindDrawMode() {
        const self = this;
        this.toggleTraducao.addEventListener('change', () => self._renderizarModoManual());

        const btnAdd = this._q('#btnAddNewBlock');
        btnAdd.addEventListener('click', () => {
            self.blocosManuais.push(criarMatrizVazia());
            self._renderizarModoManual();
            setTimeout(() => {
                const container = btnAdd.parentElement;
                if (container.scrollHeight > container.clientHeight) {
                    container.scrollTop = container.scrollHeight;
                }
            }, 50);
        });

        this.canvasDraw.addEventListener('mousedown', (e) => self._lidarComCliqueGrid(e));
        this.canvasDraw.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            self._lidarComCliqueGrid({ clientX: touch.clientX, clientY: touch.clientY });
        }, { passive: false });
    }

    _lidarComCliqueGrid(e) {
        const self = this;
        const rect = this.canvasDraw.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        const parent = this.canvasDraw.parentElement;
        const available = Math.max(280, parent.clientWidth - 24);
        const autoPerRow = Math.max(1, Math.floor(available / this.advanceX));
        const blocksPerRow = this.cfgBlocksPerRow > 0 ? this.cfgBlocksPerRow : autoPerRow;

        const blockContentH = 5 * this.cellSize + 4 * this.gap;
        const rowH = blockContentH + this.blockRowGap;

        for (let b = 0; b < this.blocosManuais.length; b++) {
            const row = Math.floor(b / blocksPerRow);
            const col = b % blocksPerRow;

            const blocoStartX = 10 + col * this.advanceX;
            const blocoStartY = this.yOffsetStart + row * rowH;

            const blocoEndX = blocoStartX + this.blockWidth;
            const blocoEndY = blocoStartY + blockContentH;

            if (clickX >= blocoStartX && clickX <= blocoEndX &&
                clickY >= blocoStartY && clickY <= blocoEndY) {

                const localX = clickX - blocoStartX;
                const localY = clickY - blocoStartY;

                const coluna = Math.floor(localX / (this.cellSize + this.gap));
                const linha = Math.floor(localY / (this.cellSize + this.gap));

                if (coluna < 5 && linha < 5) {
                    let estadoAtual = this.blocosManuais[b][linha][coluna];

                    if (estadoAtual > 0) {
                        this.blocosManuais[b][linha][coluna] = (estadoAtual + 1) % 5;
                    } else {
                        let seccao = null;
                        if (coluna === 0) seccao = "esquerda";
                        else if (coluna === 4) seccao = "direita";
                        else if (coluna >= 1 && coluna <= 3 && linha >= 1 && linha <= 3) seccao = "centro";

                        if (seccao !== null) {
                            let celulasAtivasNaSeccao = 0;

                            if (seccao === "esquerda") {
                                for (let l = 0; l < 5; l++) if (this.blocosManuais[b][l][0] > 0) celulasAtivasNaSeccao++;
                            } else if (seccao === "direita") {
                                for (let l = 0; l < 5; l++) if (this.blocosManuais[b][l][4] > 0) celulasAtivasNaSeccao++;
                            } else if (seccao === "centro") {
                                for (let l = 1; l <= 3; l++) {
                                    for (let c = 1; c <= 3; c++) {
                                        if (this.blocosManuais[b][l][c] > 0) celulasAtivasNaSeccao++;
                                    }
                                }
                            }

                            this.blocosManuais[b][linha][coluna] = Math.min(celulasAtivasNaSeccao + 1, 4);
                        }
                    }

                    this._renderizarModoManual();
                    return;
                }
            }
        }
    }

    _bindGameMode() {
        const self = this;
        this.gameInput.addEventListener('input', () => self._verificarResposta());
        this._q('#btnNovaPalavra').addEventListener('click', () => self._iniciarNovaRodadaJogo());
        const btnMostrar = this._q('#btnMostrarResposta');
        if (btnMostrar) {
            btnMostrar.addEventListener('click', () => {
                if (self.palavraAtualJogo) {
                    self.gameInput.value = self.palavraAtualJogo;
                    self._verificarResposta();
                }
            });
        }
    }

    _iniciarNovaRodadaJogo() {
        const palavras = this.palavrasJogo;
        const idx = Math.floor(Math.random() * palavras.length);
        this.palavraAtualJogo = palavras[idx].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim();
        this.blocosJogo = this._processarTexto(this.palavraAtualJogo);
        this.gameInput.value = "";
        this.feedbackGame.innerHTML = "";
        this.feedbackGame.style.color = "";
        this._atualizarProgresso(0);
        this._renderizarJogo();
        this.gameInput.focus();
    }

    _renderizarJogo() {
        this._renderizarBlocosEmCanvas(this.canvasGame, this.ctxGame, this.blocosJogo);
    }

    _calcularSimilaridadeFonetica(alvo, tentativa) {
        const blocosAlvo = this._processarTexto(alvo);
        const blocosTentativa = this._processarTexto(tentativa);
        const maxLen = Math.max(blocosAlvo.length, blocosTentativa.length);

        let totalAlvo = 0;
        let match = 0;

        for (let b = 0; b < maxLen; b++) {
            const gA = (b < blocosAlvo.length) ? blocosAlvo[b].grid : criarMatrizVazia();
            const gT = (b < blocosTentativa.length) ? blocosTentativa[b].grid : criarMatrizVazia();
            for (let l = 0; l < 5; l++) {
                for (let c = 0; c < 5; c++) {
                    if (gA[l][c] > 0) totalAlvo++;
                    if (gA[l][c] > 0 && gT[l][c] > 0) match++;
                }
            }
        }

        if (totalAlvo === 0) return 0;
        return Math.round((match / totalAlvo) * 100);
    }

    _atualizarProgresso(percent) {
        this.progressBar.style.width = percent + '%';
        const hue = Math.min(120, (percent / 100) * 120);
        this.progressBar.style.background = `hsl(${hue}, 70%, 50%)`;
        this.progressLabel.textContent = percent > 0 ? percent + '% de correspondência fonética' : '';
    }

    _verificarResposta() {
        const tentativa = this.gameInput.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim();
        if (!this.palavraAtualJogo) return;
        if (tentativa === this.palavraAtualJogo) {
            this.feedbackGame.innerHTML = "\u2713 Certo!";
            this.feedbackGame.style.color = "#4ade80";
            this._atualizarProgresso(100);
        } else if (tentativa.length > 0) {
            const pct = this._calcularSimilaridadeFonetica(this.palavraAtualJogo, tentativa);
            this._atualizarProgresso(pct);
            if (pct >= 80) {
                this.feedbackGame.innerHTML = "\u2248 Muito perto!";
                this.feedbackGame.style.color = "#fbbf24";
            } else if (pct >= 50) {
                this.feedbackGame.innerHTML = "\u2248 Vai no bom caminho";
                this.feedbackGame.style.color = "#fbbf24";
            } else {
                this.feedbackGame.innerHTML = "\u2717 Tenta outra vez";
                this.feedbackGame.style.color = "#f87171";
            }
        } else {
            this.feedbackGame.innerHTML = "";
            this._atualizarProgresso(0);
        }
    }

    _bindResize() {
        const self = this;
        window.addEventListener('resize', () => {
            self._updateGridSizes();
            self._renderizarModoTexto(self._processarTexto(self._currentText || ''));
            self._renderizarModoManual();
            if (self.tabGame && self.tabGame.classList.contains('active')) self._renderizarJogo();
        });
    }

    atualizarTexto(novoTexto) {
        this._currentText = novoTexto;
        this._renderizarModoTexto(this._processarTexto(novoTexto));
    }
}