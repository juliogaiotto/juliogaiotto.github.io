# Guia de Comandos do GitHub

--- 

## ⚙️ Resumo do fluxo de operação

Se você acabou de criar a pasta local e quer subir arquivos para o GitHub, siga estes comandos em ordem:

```Bash
# Caso ainda não tenha sido feito
git init 
```

```Bash
# Adiciona todos os arquivos da pasta atual para o envio
git add .
```

```Bash
# Mensagem obrigatória
git commit -m "Primeiro commit"
```

```Bash
# Garante que o nome seja main:
git branch -M main 
```

```Bash
# Se ainda não adicionou o remote:
git remote add origin https://github.com/seu-usuario/nome-do-repositorio.git
```

```Bash
# Atualiza o repositorio com os arquivos
git push -u origin main
```

--- 

## 📗 Detalhando os Comandos

### 🚀 Inicializando o Git em uma pasta

Crie uma pasta local para armazenar seus projetos, entre nela e inicialize o Git pelo comando:

```Bash
git init
```
---

### 🔗 Conectando o PC ao GitHub

Adicione o endereço remoto. Este é o comando que faz a “ponte” entre o seu PC e o GitHub:

```Bash
git remote add origin https://github.com/seu-usuario/nome-do-repositorio.git
```
>``origin``: É o nome padrão que damos para o servidor principal.

---

### ☑️ Verificando a Conexão

Para ter certeza de que a associação foi feita corretamente, use o comando:

```Bash
git remote -v
```
>O terminal deve responder com duas linhas mostrando a URL do seu GitHub (uma para fetch e outra para push).

---

### 💻 Trazendo os arquivos do GitHub para o computador

#### 1. Pegando os arquivos pela primeira vez

```Bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```

#### 2. Para atualizar os arquivos do computador com os do GitHub

```Bash
git pull origin main
```

---

### ☁️ Enviando arquivos do Computador para o GitHub

#### 1. Adiciona todos os arquivos/pastas para envio e deixa preparados
```Bash
git add .
```

#### 2. Fecha o pacote de envio e coloca uma mensagem obrigatória

```BASH
git commit -m "Atualização do manual prático do GitHub"
```

#### 3. Envia os arquivos e atualiza o GitHub com eles

```bash
git push -u origin main
```

---

<br>

## 📑 Branchs

Uma ``branch`` (que significa "ramo" ou "ramificação") é uma linha do tempo paralela dentro do seu projeto de Git. Ela permite que você desenvolva novas funcionalidades, corrija bugs ou teste ideias sem afetar o código principal que está funcionando.

Pense no seu projeto como uma árvore: o tronco principal é onde fica a versão oficial e estável do seu código. Cada ``branch`` que você cria é um galho que sai desse tronco.

### 1. Por que usar branchs?

Imagine que você está finalizando o seu portfólio em HTML e decide testar uma cor de fundo totalmente diferente ou uma nova animação.

- Sem branch: Se você errar o código no arquivo principal e salvar, seu site pode "quebrar" ao vivo.

- Com branch: Você cria um "galho" chamado teste-cores, faz toda a bagunça que quiser lá e, se ficar ruim, você simplesmente deleta esse galho. O "tronco" (main) permanece intacto.


### 2. O Fluxo de Trabalho (Workflow)

O uso de branchs segue geralmente este ciclo:

- **Branch main** (ou Master): É a versão de produção. O código aqui deve estar sempre pronto para o usuário final.

- **Criação da Branch**: Você "sai" da main para criar uma tarefa (ex: feature-contato).

- **Desenvolvimento**: Você faz seus commits apenas nessa ramificação.

- **Merge** (União): Quando a tarefa termina e você testou tudo, você "funde" os arquivos da sua branch de volta para a main.

### 3. Comandos Práticos para Lidar com Branchs

| Comando | O que ele faz |
| :--- | :--- |
|``git branch`` | Lista todas as branchs que existem no seu computador.|
|``git checkout -b nome-da-branch`` | Cria uma nova branch e já entra nela automaticamente.|
|``git checkout main`` | Sai da sua branch atual e volta para a principal.|
|``git merge nome-da-branch`` | (Estando na main) Traz as alterações da outra branch para dentro da principal.|
|``git branch -d nome-da-branch`` | Deleta a branch após você ter unido os códigos.|
|``git branch -m master main``|Renomeia a branch ``master`` para ``main``|

### 4. Vantagens de Trabalhar assim
Segurança: Você nunca mexe no código que está "em pé" enquanto ainda está testando algo novo.

Organização: Se você estiver trabalhando em duas coisas ao mesmo tempo (ex: um erro no CSS e um novo botão), você pode ter uma branch para cada uma e alternar entre elas sem misturar os códigos.

Trabalho em Equipe: Várias pessoas podem trabalhar no mesmo repositório, cada uma em seu "galho", sem que uma apague o código da outra.

---

## 2. Renomeando uma Branch

Muitas vezes, o Git inicia o repositório com o nome padrão ``master``. Se você tentar dar um push em ``main``, mas sua branch local for ``master``, o Git retornará um erro: 

```
error: src refspec main does not match any
error: failed to push some refs to
```
Você pode verificar a _"branch atual"_
Se aparecer ``* master``, você deve renomeá-la ou fazer o ``push`` para ``master``.

Como resolver renomeando ``master`` para ``main``:

```Bash
git branch -m master main
```
Depois disso você pode usar o ``git push -u origin main``

### 3. Diferença de maiúsculas e minúsculas
Embora raro em sistemas Windows, o Git diferencia ``Main`` de ``main``. Certifique-se de que o nome está exatamente igual ao que aparece no comando ``git branch``.

---

