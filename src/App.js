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
      bookAll: [],
      viewHeads:  true,
      searchView: true
    };
    this.updateBooks = this.updateBooks.bind(this)
    this.boolTrueSearchView = this.boolTrueSearchView.bind(this)
    this.boolFalseSearchView = this.boolFalseSearchView.bind(this)
    
    this.self = this
  }

  componentDidMount() { 
    this.setState({searchView: true})    
    BooksAPI.getAll()
    .then((books) => {
      this.setState({ books },()=>{
        this.setState({ bookAll: books})
      })      
    })
  } 

  boolTrueSearchView() {  
    this.setState({searchView: true })
  }

  boolFalseSearchView() {    
    this.setState({searchView: false })
  }

  updateBooks(bookNew , updateShelf) {
    this.state.bookAll.map((book,index)=>{
      if (book.id === bookNew.id ){
          let newState = Object.assign({}, this.state);
          newState.bookAll[index].shelf = updateShelf;
          BooksAPI.update(book , updateShelf )
          .then((book) => {
             return this.self.setState({books: this.state.bookAll })             
          }) 
        }
    })
  }

  render() {

    return (
      <div className="app">
        <Route exact path="/" 
            render={ () => <ListBooks  onUpdateBooks={this.updateBooks} books={this.state.books.filter((book) => book.shelf == "currentlyReading")} titulo="Currently Reading" viewHeads={this.state.viewHeads} />}  />
      
        <Route exact path="/" 
            render={ () => <ListBooks  onUpdateBooks={this.updateBooks} books={this.state.books.filter((book) => book.shelf =="wantToRead")} titulo="Want to Read" />}  />
        
        <Route exact path="/" 
            render={ () => <ListBooks  onUpdateBooks={this.updateBooks} books={this.state.books.filter((book) => book.shelf == "read")} titulo="Read" />}  />

        <Route path="/search" 
            render={ (props) => <SearchBook {...props} onUpdateBooks={this.updateBooks} books={this.state.books} searchTop="true" searchView={this.boolTrueSearchView}  />}  />

         {this.state.searchView ? (
             <div className="open-search">
              <Link 
                  to="/search"  
                  onClick={this.boolFalseSearchView} 
                  onBoolTrueSearchView={this.boolTrueSearchView}           
                  className="search-books"
                  >Add a book</Link>       
            </div> 
          ):(null)}    
      </div>
    )
  }
}

export default BooksApp