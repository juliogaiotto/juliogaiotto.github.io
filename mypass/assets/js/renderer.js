"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Elementos da UI
const inputNome = document.getElementById('inputNome');
const inputSite = document.getElementById('inputSite');
const inputSenha = document.getElementById('inputSenha');
const selLength = document.getElementById('selLength');
const chkUpper = document.getElementById('chkUpper');
const chkLower = document.getElementById('chkLower');
const chkNum = document.getElementById('chkNum');
const chkSpec = document.getElementById('chkSpec');
const btnGerar = document.getElementById('btnGerar');
const btnSalvar = document.getElementById('btnSalvar');
const statusMessage = document.getElementById('statusMessage');
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
        charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
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
    statusMessage.innerText = "";
});

// Função para salvar
document.getElementById('btnSalvar').addEventListener('click', () => {
    // Coleta os valores dos inputs
    const nome = document.getElementById('inputNome').value;
    const site = document.getElementById('inputSite').value;
    const senha = document.getElementById('inputSenha').value;

    // Validação básica
    if (!nome || !site || !senha) {
        alert("Por favor, preencha todos os campos e gere uma senha.");
        return;
    }

    const dataInclusao = new Date().toLocaleString('pt-BR');

    // Monta o conteúdo do arquivo .txt de forma organizada
    const conteudoTxt = 
`
==============================
MyPass - Gerenciador de Senhas
==============================
SITE:       ${site}
NOME/LOGIN: ${nome}
SENHA:      ${senha}
CRIADO EM:  ${dataInclusao}
==============================
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
    link.download = `MyPass.txt`;

    // Executa o download
    document.body.appendChild(link);
    link.click();
    
    // Limpeza
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
});