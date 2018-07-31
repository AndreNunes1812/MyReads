import React , {Component} from 'react'
import { debounce } from 'throttle-debounce';
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import escapeRegExp from 'escape-string-regexp'
import sortyBy from 'sort-by'
import * as BooksAPI from './BooksAPI'

class SearchBook extends Component {

    constructor(props){
        super(props)
        this.state = {
            query: '',
            books: []
        }

        this.updateBooks = this.updateBooks.bind(this)
        this.searchBook =  this.searchBook.bind(this)
        this.searchDebounced =  debounce(1000 , this.completeSearch)
        
        this.updateBookObject = this.updateBookObject.bind(this)
        this.self = this
    }
    
    componentDidMount() { 
      BooksAPI.getAll()
        .then((books) => {
            this.self.setState({books})    
        })      
    }

    completeSearch = q => {
        this.searchBook(q);
    };

    onUpdate(valor , codigo, book, indice) {
        this.props.onUpdate(valor , codigo, book, indice);
    }

    searchBook(e) {
        let valor = e;
        this.self.setState({query: valor}, ()=>{
            BooksAPI.search(valor)
            .then((search) =>{
                try {
                    if (valor)  {
                        const match = new RegExp(escapeRegExp(valor) , 'i')
                        this.self.setState({books: search.filter((book) => match.test(valor)) })
                    }                    
                }
                catch (e) { this.self.setState({books: []})  }
            })
        })           
    }

    updateBookObject(updateShelf , id) {
        let indice = -1;
        const updatedBooks = this.state.books.map( (book, index) => {
            if (book.id === id) { 
                indice = index
              return {
                ...book,
                shelf: updateShelf
              }
            }
            return book
          })

          this.self.setState({books : updatedBooks }, (idNew)=>{
            this.onUpdate(updateShelf , id , updatedBooks, indice )
          })
    }

    changeQuery = event => {
        this.setState({ query: event.target.value }, () => {
          this.searchDebounced(this.state.query);
        });
      };
    

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

    render() {
            const { onUpdateBooks, onUpdate } = this.props   
            return (
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link className="close-search"  to="/">Close</Link>
                        <div className="search-books-input-wrapper">               
                            <input 
                                type="text" 
                                placeholder="Search by title or author"
                                value={this.state.query}
                                onChange={ this.changeQuery }/>
                        </div>
                    </div>
                </div>             
                <div className="search-books-results">
                    <ListBooks  onUpdateBooks={this.updateBooks}  books={ this.state.books } searchTop="false" />                  
                </div>
            </div>
            )
    }
}

export default SearchBook
