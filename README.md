# Projeto MyReads

Este projeto atende ao primeiro modulo do **Programa Nanodegree - Desenvolvimento React**.

## Objetivo

O sistema consiste em gerenciar livros em determinadas prateleira(s), ou seja, o(s) livro(s) podem estar nos seguites estados: **lendo atualmente**, **quero ler** ou **lido**, o sistema oferece ainda uma pesquisa avançada de livros que podem ser adcionanda a(s) prateleira(s).

## Especificação do projeto:

#### Configuração do Projeto
A aplicação foi criada com o create-react-app e exige apenas o npm install e npm start para  ser instalada e iniciada (ou com yarn).<br />
Um README atualizado que descreve o projeto e tem instruções para instalar e rodar o projeto estão incluídas no README.

####  Página principal 
A página principal exibe três estantes de livros, e cada livro é mostrado na estante correta.
A página principal exibe um controle que permite aos usuários mudar os livros de estante.<br />
O controle deve estar ligado a cada instância de livros. A funcionalidade de mover um livro para uma estante diferente funciona corretamente.<br />
Quando é feito refresh no navegador, a página continua exibindo as mesmas informações.

#### Página de busca
#### A página de busca tem um input de busca que permite que os usuários procurem por livros?
1) A página de busca possui um campo de busca.
2) A página de busca se comporta corretamente:<br />
a) Quando o usuário digita algo no campo de busca, os livros relacionados à sua busca são corretamente exibidos na página.<br />
b) Resultados de buscas não são mostrados quando todo o texto do input de pesquisa é deletado.<br />
c) Buscas inválidas são cuidadas e resultados anteriores não são mostrados.<br />
d) A pesquisa funciona corretamente quando um livro não possui um thumbnail ou um autor. (Para testar isto, pesquise por "poetry" e "biography").<br />
e) O usuário consegue pesquisar com múltiplas palavras, tais como "artificial intelligence".

#### Os resultados de busca permitem que um usuário categorize um livro como "Lendo Atualmente", "a Ler" ou "Lido"?

1) Os resultados da página de busca permitem que os usuários selecionem "Lendo Atualmente", "A Ler" ou "Lido" e coloquem os livros na estante certa.

2) Livros que não possuem uma estante possuem a marcação em "None" na lista de seleção.

3) Livros que já estão na estante possuem a marcação em sua respectiva estante da lista de seleção.

#### As seleções feitas na página de busca aparecem na página principal?
Quando um livro é categorizado na página de busca e o usuário navega para a página principal, o livro aparece na respectiva estante da página principal.

### Routing
#### A página principal conecta-se à página de busca?
A página principal contém um link para a página de busca. Ao clicar neste link, a página de busca é exibida e a URL no endereço do navegador é /search.

A página de busca é exibida corretamente ao entrar na página inserindo /search diretamente na URL do projeto no navegador.

#### A página de busca conecta-se de volta à página principal?
A página de busca contém um link para a página principal. Ao clicar neste link, a página principal é exibida e a URL no endereço do navegador é /.

### Funcionalidade do código
#### O código do projeto lida com o gerenciamento de estado de forma adequada?
O estado componente é passado dos componentes pais para os filhos. A variável de estado não é modificada diretamente - a função setState() é usada de forma correta.

Os livros possuem o mesmo estado tanto na página de busca como na página principal da aplicação: se um livro está na estante, isso é refletido nos dois locais.

#### O JSX é formatado de maneira adequada?
Todos os códigos JSX são formatados de maneira adequada e funcional.


#### Lembrete:

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

## Pesquisa de Livro(s)

Para simplificar o desenvolvimento da pesquisa foi fornecida uma API **BOOKSAPI** para integrar ao projeto, conforme descrito abaixo em *inglês*.

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

Este projeto foi inicializado com o [Create React App](https://github.com/facebookincubator/create-react-app). Você pode encontrar mais informações sobre como executar tarefas comuns [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contribuição

Esté repositório é para atender os alunos da Udacity
para maiores detalhes, clique aqui [CONTRIBUTING.md](CONTRIBUTING.md).
