// Seleciona os novos elementos do DOM
const inputQuantidade = document.getElementById('qtd-numeros');
const btnGerarDinamico = document.getElementById('btn-gerar-dinamico');

// Adiciona o evento de clique
btnGerarDinamico.addEventListener('click', () => {
    // Captura o valor vindo do HTML (input)
    const valorHtml = inputQuantidade.value;
    
    // Passa o valor para a sua função
    sortearQuantidade(valorHtml);
});

// Sua função atualizada
function sortearQuantidade(num_escolha) {
    const numeros = [];
    const quantidade = parseInt(num_escolha);

    // Validação conforme sua lógica
    if (isNaN(quantidade) || quantidade < 6 || quantidade > 20) {
        alert("Por favor, escolha um número entre 6 e 20.");
        return;
    }

    // Lógica de sorteio aleatório sem repetição [cite: 43, 46]
    while (numeros.length < quantidade) {
        const num = Math.floor(Math.random() * 60) + 1;
        if (!numeros.includes(num)) {
            numeros.push(num);
        }
    }

    jogoAtual = numeros.sort((a, b) => a - b); // Ordenação para UX
    renderizarSorteio(); // Exibe visualmente no HTML
}