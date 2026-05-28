import { VisualizadorTipoA } from './vizA.js';
import { VisualizadorTipoB } from './vizB.js';
import { VisualizadorTipoC } from './vizC.js';

const inputCentral = document.getElementById('texto-fonetico');
const areaVisualizadores = document.getElementById('area-visualizadores');
const botoesVista = document.querySelectorAll('.btn-vista');

const containerA = document.getElementById('container-a');
const containerB = document.getElementById('container-b');
const containerC = document.getElementById('container-c');

const instanciaA = new VisualizadorTipoA(containerA);
const instanciaB = new VisualizadorTipoB(containerB);
const instanciaC = new VisualizadorTipoC(containerC);

let modoAtivo = 'todas';

function atualizarTodosVisualizadores(texto) {
    instanciaA.atualizarTexto(texto);
    instanciaB.atualizarTexto(texto);
    instanciaC.atualizarTexto(texto);
}

inputCentral.addEventListener('input', (e) => {
    atualizarTodosVisualizadores(e.target.value);
});

botoesVista.forEach(btn => {
    btn.addEventListener('click', () => {
        const modo = btn.dataset.modo;

        botoesVista.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        modoAtivo = modo;

        areaVisualizadores.classList.remove('modo-todas', 'modo-aba-a', 'modo-aba-b', 'modo-aba-c');

        if (modo === 'todas') {
            areaVisualizadores.classList.add('modo-todas');
        } else if (modo === 'a') {
            areaVisualizadores.classList.add('modo-aba-a');
        } else if (modo === 'b') {
            areaVisualizadores.classList.add('modo-aba-b');
        } else if (modo === 'c') {
            areaVisualizadores.classList.add('modo-aba-c');
        }
    });
});

if (inputCentral.value) {
    atualizarTodosVisualizadores(inputCentral.value);
}