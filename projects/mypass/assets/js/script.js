// Função para gerar a senha
btnGerar.addEventListener('click', () => {
    const length = parseInt(selLength.value);
    const hasUpper = chkUpper.checked;
    const hasLower = chkLower.checked;
    const hasNum = chkNum.checked;
    const hasSpec = chkSpec.checked;
    let charset = "";
    if (hasUpper)
        charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (hasLower)
        charset += "abcdefghijklmnopqrstuvwxyz";
    if (hasNum)
        charset += "0123456789";
    if (hasSpec)
        charset += "!@#$%^&*()_+~}{[]:;?><,./-=\\\'\"";
    if (charset === "") {
        alert("Selecione pelo menos uma opção de caracteres!");
        return;
    }
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    inputSenha.value = password;
    inputSenha.dispatchEvent(new Event('input'));
    statusMessage.innerText = "";
});

// Função para salvar
document.getElementById('btnSalvar').addEventListener('click', () => {
    // Coleta os valores dos inputs
    const nome = document.getElementById('inputNome').value;
    const site = document.getElementById('inputSite').value;
    const senha = document.getElementById('inputSenha').value;

    // Validação básica
    // if (!nome || !site || !senha) {
    //     alert("Por favor, preencha todos os campos e gere uma senha.");
    //     return;
    // }

    const dataInclusao = new Date().toLocaleString('pt-BR');

    // Monta o conteúdo do arquivo .txt de forma organizada
    const conteudoTxt = 
`
====================================
   MyPass - Gerenciador de Senhas
====================================
 SITE:       ${site}
 NOME/LOGIN: ${nome}
 SENHA:      ${senha}
 CRIADO EM:  ${dataInclusao}
====================================
   juliogaiotto.github.io/mypass/
`;

    // Cria um "Blob" com o conteúdo de texto
    const blob = new Blob([conteudoTxt], { type: 'text/plain' });

    // Gera a URL para o download
    const url = URL.createObjectURL(blob);

    // Cria o elemento de link temporário
    const link = document.createElement('a');
    link.href = url;
    
    // Define o nome do arquivo com o nome do site para facilitar a organização
    link.download = `MyPassWord.txt`;

    // Executa o download
    document.body.appendChild(link);
    link.click();
    
    // Limpeza
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
});



// Lógica de Validação (JavaScript)
// const passwordInput = document.getElementById('passwordInput');
const passwordInput = document.getElementById('inputSenha');
const strengthMeter = document.getElementById('strengthMeter');
const strengthText = document.getElementById('strengthText');

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    let score = 0;

    if (password.length === 0) {
        strengthMeter.style.width = '0%';
        // strengthText.textContent = 'Digite uma senha...';
        strengthText.textContent = ' ';
        return;
    }

    // 1. Checa o comprimento
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    // 2. Checa variedade de caracteres (usando Expressões Regulares)
    if (/[A-Z]/.test(password)) score++; // Tem maiúscula
    if (/[0-9]/.test(password)) score++; // Tem número
    if (/[^A-Za-z0-9]/.test(password)) score++; // Tem caractere especial

    // 3. Atualiza o visual do medidor baseado no score (0 a 5)
    let width = (score / 5) * 100;
    strengthMeter.style.width = `${width}%`;

    if (score <= 2) {
        strengthMeter.style.backgroundColor = '#ff4d4d'; // Vermelho
        strengthText.textContent = 'Fraca';
        strengthText.style.color = '#ff4d4d';
    } else if (score === 3 || score === 4) {
        strengthMeter.style.backgroundColor = '#ffc107'; // Amarelo/Laranja
        strengthText.textContent = 'Média';
        strengthText.style.color = '#ffc107';
    } else {
        strengthMeter.style.backgroundColor = '#2ecc71'; // Verde
        strengthText.textContent = 'Forte';
        strengthText.style.color = '#2ecc71';
    }
});