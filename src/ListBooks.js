import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books:[],          
        }; 

        this.handleChange =this.handleChange.bind(this)
        this.bookUpdate = this.bookUpdate.bind(this)
        this.self = this 
    }

    componentDidMount() {     
        if(this.state.books.length === 0) {
            this.setState({ books: this.props.books })
        }
    } 

    componentDidUpdate(prevProps) {
        if (this.props.books !== prevProps.books) {
           this.setState({books:this.props.books})
        }
    }

    handleChange = (param) => (e) => {
        let updataBook =  e.target.value;
        
        BooksAPI.update(param , updataBook )
        .then((book) => {
            this.setState( { book } )            
            this.bookUpdate(param.id ,updataBook )                                   
        }) 
    }

    bookUpdate=(bookId , updateShelf)=> {
        this.state.books.map((book)=>{
            if (book.id === bookId ){
               this.updateState(book.id , updateShelf)
            }
        }) 
    }

    render() {  
        const { onUpdateBooks } = this.props
        return (
            <div>  
                 {this.props.viewHeads ? (
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>  
                 ) : ( null) }               
                <div className="bookshelf"> 
                    <h2 className="bookshelf-title">{ this.props.titulo }</h2>                
                    <ol className='books-grid'>                          
                        {this.state.books.map((book) =>(                                
                            <li key={book.id} >                                         
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                            <div className="book-shelf-changer">                                                
                                                <select id="lang" onChange={ (e)=> onUpdateBooks(book,e.target.value) }
                                                    value={book.shelf}>
                                                    <option value="move" disabled>Move to...</option>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{ book.title }</div>
                                        <div className="book-authors">{ book.authors }</div>
                                    </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default ListBooks


