<h1 align ='center' >  API-GITHUB EXPLORER </h1>

## 🔖 Sobre

> Consiste em  uma aplicação que usa a api do Github, para obter informações sobre um usuário, e listar  os repositórios do usuário, e os repositórios estrelados pelo usuário

## Como a aplicação funciona

Ao executar o projeto, você sera redirecionado para a página de pesquisa, ao digitar seu usuário do github no campo de pesquisas, e apertar em buscar, você sera redirecionado para a página de informações do usuário, a mesma também pode ser acessada pela url http://localhost:3000/usersInfo/{username}, ao ser redirecionado para a página de informações do usuário sera mostrado na tela as informações do usuário, e a listagem de repositórios do mesmo, ao clicar no botão List Starred Repos, serão listados os repositórios estrelados pelo usuário, e ao clicar em listar repositórios, sera listado os repositórios do usuário.

![Home](https://i.imgur.com/MQmEc6E.png)
![UserInfo](https://i.imgur.com/vHenLVV.png)

****

## 💻 Linguagens/Frameworks/Bibliotecas Utilizadas

* 🖥️ NextJS
* ✏️ SASS
* <img src = 'https://badges.aleen42.com/src/javascript.svg'> 
*  <img alt = 'react' src = "https://badges.aleen42.com/src/react.svg">
* <img alt ='mocha' src = 'https://badges.aleen42.com/src/mocha.svg'>

## Url da aplicação

A aplicação está hospedada na vercel e pode ser acessada pelo link https://api-github-explorer-s.vercel.app/

#

## Instalação

Para começar processo de desenvolvimento você deve ter em sua máquina as seguintes ferramentas:

- NodeJS
- GIT

### Baixando a aplicação

```bash
$ git clone https://github.com/mwerneck1956/api-github-explorer.git
$ cd src
```

### Configurando variáveis de ambiente

Para configurar as variáveis de ambientes necessárias para o funcionamento da aplicação, você deve criar um arquivo chamado ```.env.local``` (para rodar localmente) com base no modelo presente no arquivo ```.env.example```, a única váriavel de ambiente é a GITHUB_TOKEN, que consiste no seu token de acesso pessoal do github, sem utilizar o token a aplicação está restrita a 60 requisições na api do github por hora, o formato do token é 
```bash
GITHUB_TOKEN = token seuToken
```
Instruções para obter o token de acesso pessoal : https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token


### Instalando dependências

```bash
$ npm i || yarn install
```

### Executando a aplicação

```bash
$ npm run dev || yarn dev
```

### 🧪 Testes

O Projeto tem testes para verificar se as requisições de listagem de repositórios, listagem de usuário, e listagem de repositória starred pelo usuário estão funcionando, para rodar os testes é necessario digitar no terminal/bash :

```bash
$ npm run test || yarn test
```