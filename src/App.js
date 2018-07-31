import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      viewHeads:  true,
      booksNew: []

    };
    this.updateBooks = this.updateBooks.bind(this)
    this.updateBookObject = this.updateBookObject.bind(this)
    this.onUpdate = this.onUpdate.bind(this)

    // this.boolTrueSearchView = this.boolTrueSearchView.bind(this)
    // this.boolFalseSearchView = this.boolFalseSearchView.bind(this)
    
    this.self = this
  }

  componentDidMount() { 
    this.setState({searchView: true})    
    BooksAPI.getAll()
    .then((books) => {
        this.setState({ books })
    })
  } 

  componentDidUpdate(prevProps) {
    console.log('voltei App',this.state.books)
    if (this.props.books !== prevProps.books) {
        this.updateState()
        console.log('voltei App dentro')
    }
  }

  updateState() {
    this.setState({books: this.state.books});
  }

  onUpdate(val , codigo, livros, indice) {
    console.log('val de App:', val , codigo, livros, indice)
    console.log('true ou false:',this.validateBook(codigo))
    if(this.validateBook(codigo)) {
      this.updateBookObject(val, codigo)
    } else {
      this.insertBook(livros[indice])
    }
    
    // this.setState({booksNew: val}, ()=>{
    //     console.log('BookNews:', this.state.booksNew )
    //     this.self.setState({books: this.self.state.booksNew})
    // });
  }

  validateBook( codigo) {
    console.log('validateBook:', codigo)
    let codigoNew = codigo
    let retorno = false
    this.state.books.forEach((book)=> {
      console.log('updateBook KKK:', codigoNew, book.id )
      if (book.id == codigoNew ){
        console.log('igual:')
        retorno = true           
      }
    })
    return retorno
  }

  insertBook(book) {
    console.log('Insert book:',book)
    this.state.books.push(book)
  }

  updateBooks(bookNew , updateShelf) {
    console.log('voltei:',bookNew, updateShelf)
    this.state.books.forEach((book)=>{
        if (book.id === bookNew.id ){
           let bookId = book.id;  
           BooksAPI.update(book , updateShelf )
           .then((book) => {                  
                this.updateBookObject(updateShelf , bookId )
           }) 
        }
    })
  }

  updateBookObject(shelfNew , id) {
    console.log('updateBookObject:',shelfNew, id)
    this.state.books.forEach((book , index) => {
        if(book.id == id){
            let bookUp = book;
            bookUp.shelf = shelfNew;
            this.setState({book : bookUp })
            console.log('Livro:' , shelfNew , id , index, bookUp)
            console.log('Livro Alterado:' , this.state.books)
            
        }

    })
  }
    

  render() {

    return (
      <div className="app">

        <Route exact path="/" render={ () => (
          <div>
            <ListBooks  onUpdateBooks={this.updateBooks} books={this.state.books.filter((book) => book.shelf == "currentlyReading")} titulo="Lendo Atualmente" viewHeads={this.state.viewHeads} />
            <ListBooks  onUpdateBooks={this.updateBooks} books={this.state.books.filter((book) => book.shelf =="wantToRead")} titulo="A ler" />
            <ListBooks  onUpdateBooks={this.updateBooks} books={this.state.books.filter((book) => book.shelf == "read")} titulo="Lido" />
            <div className="open-search">
              <Link 
                  to="/search"  
                  className="search-books">
              </Link>       
            </div> 
          </div>
        )} />

        <Route path="/search" 
          render={ () => <SearchBook onUpdate={this.onUpdate} books={this.state.books} searchTop="true"   />}  />

      </div>
    )
  }
}

export default BooksApp