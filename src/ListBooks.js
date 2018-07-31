import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books:[]          
        }; 

        this.updateBookObject =this.updateBookObject.bind(this)
        this.updateBooks = this.updateBooks.bind(this)
       
        this.msg = 'Não ha livro(s) disponível'
        this.self = this 
        
    }

    /*Esta função tratar quando o livro não tiver foto.*/
    validatePhoto(book){
        try {
            return  book.imageLinks.smallThumbnail
        }
        catch (e){
            return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQQDxISExAOEBAVERASEg8QDxIPEBASFRIYFhYSFRUYHCggGholHhMVITEiJSkrLi4uFx8zODM4NygtLisBCgoKBwcHDgcHGisZFRkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMIBAwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAgMBBAUGB//EADsQAAIBAgMEBwUGBgMBAAAAAAABAgMRBBIhMUFRcQUiMmGRobETUoHR8BQjYnKy4TNCgpKiwUOz8RX/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAw3baVTnd7Xa25PaBcDWk3uzeb9Scqj3J/2vUC4jKVu98DGfud+/YZjH93xAjnfBf3fsMz/D4snYWAqVdXs9PNFxqVqeuhZSlJLVLxAvBVOrbalbuZKnVUtj+AEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAFVXav6n5ELmcTNRtfTSXoayxkPeXigNkGt9th7y8UUYrpaMV1es/8AFc/kB06ZM8nV6UnL+aS7ovIvLXzK/tF9uZ/1N+oHsAeTUVa6s1x3rmbGGxs4bJNr3ZNyj80B35dr4GTQj0pBu7vF21i7tp/BEv8A6kPpP5AbGJ7Pia2Bf3nwZivj4uKe67W/aknw7yHRtVSqaPcwOuAAAAAAAAAAAAAAAAAAAAAAAAAAAAA53S8uyvw1f0/ucM7XTO2P5av6UcUCM3Y05yvr4I2K7+vrkalVgW06UpapacW7IlKnKHaWnG91+xeq/DYJVtNdm8BSdtfFce4tqRs9Nj1XI1sDK8WuF/LVG1/Iu6TXwav/AKYEJbL715rejBKD1RXTegF1T+Evzy/TEt6Fl97Dvcv0N/6KKj+7X5peiLuhv40Ocv8ArYHpgAAAAAAAAAAAAAAAAAAAAAAAAAAAAHL6a/k5VPRHGOv02+xyqeiOQBTWX19czUrx9TeqLQgoJoDnqbQc2zYqYJrZr3PRk6GAbeuzgtWBb0bC0W+fpb1ZsS0hzl6L9yWWyUY92zZy5FNepd2WxaLv4sBB6+fgRgY7vHuRJICdTsL8z9EXdDfx4c5foZRU7Pxfoi7od/fw5y/QwPUAJgAAAAAAAAAAAAAAAAAAAAAAAAAYZkAc/HYTOlrZp3Ttf4NHOl0fJb4eD+Z6Ew4rgB5uWEkt0fMplhpLVJctT1DpLgQlhovcB5lTt3d0l8yTqfiVuC18kehlg0QeBQHnZzb0ipW3uzu/kiMcPL3fNXPSLAolHBoDzkcPL3X4omqEvcl/j8z0iw64EvYrgB5tYWctMrXe2kvI38D0fkeZ6y3bkjrqmuBlICNONiYAAAAAAAAAAAAAAAAAAAAAAAAAAAAYk7JvuOfSx1SazRo3XHOjfqdl8n6HM6KwzcIy9pNK98ifV0lsA6Sn1U5WjorpvY+FzMqiUXK+iV7nPqwU8TlnrFQvGL2N/V/Arw0FbEQWtNaxW5PV6eCA6OHrqcU1v3O19pPOr2ur8L6+BzsBBRoOcUvaOE9d7avb/RrOjD7Nn/5L3zX62bMB3CMppbWlzZii24xb25VfnY586MZ4lqSuvZp2fH6YHRzaX2q19Nbmth8XKcreztvbzp2W7Zv7jVwk1TjXVrxjJ2j4q3oUQi4zoytTjmasoN3s7dq/MDtSmltaXN2JI5ipxniJqetorKnstbV/XEn0Q9JpawU2o8gOgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAw0Ro0lBZYqy4GvjcYoRlaUc6WkW7+RieJajTs6eaWW6k7aNatAXV8NGpbNFO2x6p+KJUqMYLLFJLgYq4iMdJSjF8G7GZ14xteUVfZdpX5AQoYSEG3GNm1ba9n0iP2CnmzZFfbvt4bC2lWjPsyUuTuYniYRdnOKfBtAWlaorNnt1rWv3GZ1FG12lfZd2MUq8Z9mUZcncDEcPFZuqut2t9yqPR9NbIb073d7r4iliLym80MkVuab72+Gxl/to5c2ZZfevp4gV18JCprKKb46p+RZSpqKtFJLgjE60YpNyik9jb28jMaqlG8WmuKd0BMGt0fWc6ak7XbezRbTZAAAAAAAAAAAAAAAAAAAAAAAAAEal8rtts7c7EgBwoZPs0uz7TW97Z75vHYbGLismHdlfNTV99rbDflhYNtuEG3tbitScqUWknFNK1lbZbZYDndIQUZualTbyrNTnZ3Xd4EcXUUnh5NJRd209iXV8jo1MPCTu4Rb4tJlOMwueVN9XLFvMnvTtpb4Aa9LL9p+7tbJ1svZv8Pga9DJ7Gpny+0vO+a2a+63xOxSpRj2YqPJWIzw8G7uEW+LSuBzKsb0sOpa3nFWfDd5F8oKOJhlSjeDukrJ7fkb86adrpOzurq9nxQdNXzWWZaJ21S5gaODgvbVlZW6mltNjNWNJ5vYfyqbm3+Dal9b2diNNJtpJN7XbV8xkV72V7WvvtwA5WOv7da00snV9oup3/Eu6PotOpLNTaelqfZTX/pvVaUZK0oqXNXFOmoq0UorglYDU6Gf3MecvU3iFOko9mKjv0ViYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k="
        }
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

    updateBooks(bookNew , updateShelf) {
       return this.state.books.forEach((book)=>{
            if (book.id === bookNew.id ){
               let bookId = book.id;  
               BooksAPI.update(book , updateShelf )
               .then((book) => {                  
                    this.updateBookObject(updateShelf , bookId )
               }) 
            }
        })
    }

    updateBookObject(updateShelf , id) {
        const updatedBooks = this.state.books.map( book => {
            if (book.id === id) {               
              return {
                ...book,
                shelf: updateShelf
              }
            }
            return book
          })
           this.setState({books : updatedBooks })          
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
                            { this.state.books==0 ? (
                               <h3 className="bookshelf-title">{ this.msg }</h3>      
                            ):('') }   
                            {this.state.books.map((book) =>(                                
                                <li key={book.id} >                       
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${ this.validatePhoto(book) })` }}></div>
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
                                            <div className="book-title">{ book.title ? book.title : "titulo indisponível" }</div>
                                            <div className="book-authors">{ book.authors ? book.authors : "autor indisponível"  }</div>
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


