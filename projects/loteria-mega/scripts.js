// Seleção de elementos do DOM
const gradeNumeros = document.getElementById('grade-numeros');
const contadorElemento = document.getElementById('contador');
const btnLimpar = document.getElementById('btn-limpar');
const btnConfirmar = document.getElementById('btn-confirmar');

let numerosSelecionados = [];
const LIMITE_JOGO = 6;

// 1. Função para gerar os 60 números dinamicamente 
function inicializarVolante() {
    for (let i = 1; i <= 60; i++) {
        const numeroFormatado = i < 10 ? `0${i}` : i;
        const slot = document.createElement('div');
        slot.classList.add('numero-slot');
        slot.textContent = numeroFormatado;
        
        // Adiciona evento de clique para cada número 
        slot.addEventListener('click', () => alternarSelecao(i, slot));
        
        gradeNumeros.appendChild(slot);
    }
}

// 2. Gerenciar o estado de seleção 
function alternarSelecao(numero, elemento) {
    const indice = numerosSelecionados.indexOf(numero);

    if (indice > -1) {
        // Se já estiver selecionado, remove
        numerosSelecionados.splice(indice, 1);
        elemento.classList.remove('selecionado');
    } else {
        // Se não estiver, e houver espaço no jogo, adiciona
        if (numerosSelecionados.length < LIMITE_JOGO) {
            numerosSelecionados.push(numero);
            elemento.classList.add('selecionado');
        } else {
            alert("Você já selecionou os 6 números deste jogo!");
        }
    }

    atualizarInterface();
}

// 3. Atualizar contador e habilitar/desabilitar botão 
function atualizarInterface() {
    contadorElemento.textContent = numerosSelecionados.length;
    
    // Habilita o botão apenas se o jogo estiver completo
    btnConfirmar.disabled = numerosSelecionados.length !== LIMITE_JOGO;
}

// 4. Função para limpar o volante
btnLimpar.addEventListener('click', () => {
    numerosSelecionados = [];
    const todosOsSlots = document.querySelectorAll('.numero-slot');
    todosOsSlots.forEach(slot => slot.classList.remove('selecionado'));
    atualizarInterface();
});

// 5. Ação do botão confirmar
btnConfirmar.addEventListener('click', () => {
    const jogoOrdenado = [...numerosSelecionados].sort((a, b) => a - b);
    alert(`Jogo confirmado! Seus números são: ${jogoOrdenado.join(' - ')}`);
});

// Inicializa o aplicativo ao carregar a página
inicializarVolante();