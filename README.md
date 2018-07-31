# Projeto MyReads

Este projeto atende ao primeiro modulo do **Programa Nanodegree - Desenvolvimento React**.

## Objetivo

O sistema consiste em gerenciar livros em determinadas prateleira(s), ou seja, o(s) livro(s) podem estar nos seguites tipos: **lendo atualmente**, **quero ler** ou **lido**, o sistema oferece ainda uma pesquisa avançada de livros que podem ser adcionanda a(s) prateleira(s).

## Especificação do projeto:

## Configuração do Projeto
A aplicação foi criada com o create-react-app e exige apenas o npm install e npm start para  ser instalada e iniciada (ou com yarn).
Um README atualizado que descreve o projeto e tem instruções para instalar e rodar o projeto estão incluídas no README.

##  Página principal 
        +A página principal exibe três estantes de livros, e cada livro é mostrado na estante correta.
        +A página principal exibe um controle que permite aos usuários mudar os livros de estante. O controle deve estar ligado a cada instância de livros. A funcionalidade de mover um livro para uma estante diferente funciona corretamente.
        +Quando é feito refresh no navegador, a página continua exibindo as mesmas informações.



## Lembrete:

Foi disponibilizado um modelo do projeto contendo informações basicas de layout e css, **Não** informando nenhuma aplicabilidade sobre "REACT".

* Para a instalação das dependencia do projeto é necessario está dentro da pasta do projeto e      digitar `npm install`

* Para executar a aplicação: `npm start`

## O Projeto MyReads oferece a seguinte estrutura:
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

Uma boa pratica é documentar todo(s) arquivo(s) criado(s) dentro da estrutura informada acima.

## Pesquisas dos Livros

Para simplificar o desenvolvimento da Pesquisa de livros foi fornecida uma API **BOOKSAPI**, conforme descrita abaixo em *inglês*.

We've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Importante

A API de back-end usa um conjunto fixo de resultados de pesquisa em cache e é limitada a um conjunto específico de termos de pesquisa, que podem ser encontrados em SEARCH_TERMS.md. Essa lista de termos são os únicos termos que funcionarão com o back-end, por isso não se surpreenda se suas pesquisas por Basket Weaving ou Bubble Wrap não retornarem nenhum resultado.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

Esté repositório é para atender os alunos da Udacity
para maiores detalhes, clique aqui [CONTRIBUTING.md](CONTRIBUTING.md).
