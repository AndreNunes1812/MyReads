import React , {Component} from 'react'
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
            books: [],
            bookAll: []
        }

        this.updateBooks = this.updateBooks.bind(this)

        this.self = this
    }
    
    componentDidMount() {  
           
        if(this.state.books.length === 0) {
            this.setState({ books: this.props.books })
            this.setState({ bookAll: this.props.books })            
        }
    }   

    componentDidUpdate(prevProps) {
        if (this.props.books !== prevProps.books) {
           this.setState({books:this.props.books});
        }
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    updateBooks(bookNew , updateShelf) {
    
        this.state.bookAll.map((book,index)=>{
            if (book.id === bookNew.id ){
               let newState = Object.assign({}, this.state)     
               newState.bookAll[index].shelf = updateShelf  
    
               BooksAPI.update(book , updateShelf )
               .then((book) => {                  
                    this.self.setState({books: this.self.bookAll })
               }) 
            }
        })
    }

    render() {
            const { onBoolTrueSearchView } = this.props
            let showBooks
            if (this.state.query) {
                const match = new RegExp(escapeRegExp(this.state.query) , 'i')
                showBooks = this.props.books.filter((book) => match.test(book.title))
            } else {
                showBooks = this.props.books
            }

            showBooks.sort(sortyBy('title'))

            return (
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link className="close-search" onClick={ (e)=> onBoolTrueSearchView() } to="/">Close</Link>
                        <div className="search-books-input-wrapper">               
                            <input 
                                type="text" 
                                placeholder="Search by title or author"
                                value={this.state.query}
                                onChange={(event) => this.updateQuery(event.target.value)}/>
                        </div>
                    </div>
                </div>             
                <div className="search-books-results">
                    <ListBooks  onUpdateBooks={this.updateBooks}  books={ showBooks } searchTop="false" />                  
                </div>
            </div>
            )
    }
}

export default SearchBook
