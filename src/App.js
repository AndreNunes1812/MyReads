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
    if (this.props.books !== prevProps.books) {
        this.updateState()  
    }
  }

  updateState() {
    this.setState({books: this.state.books});
  }

  onUpdate(val , codigo, livros, indice) {
    if(this.validateBook(codigo)) {
      this.updateBookObject(val, codigo)
    } else {
      this.insertBook(livros[indice])
    }
  }

  validateBook( codigo) {
    let codigoNew = codigo
    let retorno = false
    this.state.books.forEach((book)=> {
      if (book.id == codigoNew ){
        retorno = true           
      }
    })
    return retorno
  }

  insertBook(book) {
    this.state.books.push(book)
  }

  updateBooks(bookNew , updateShelf) {
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
    this.state.books.forEach((book , index) => {
        if(book.id == id){
            let bookUp = book;
            bookUp.shelf = shelfNew;
            this.setState({book : bookUp })           
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