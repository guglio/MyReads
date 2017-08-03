import React from 'react'
import * as BooksAPI from './BooksAPI'
import {
  Link
} from 'react-router-dom'
import ListBooks from './ListBooks.js'
import './App.css'
const currentlyReading=[],
      wantToRead=[],
      read=[]

class BookShelf extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

      loading: true,
      books:[]
    };

    this.updateShelfs = this.updateShelfs.bind(this);
    this.updateView = this.updateView.bind(this);
  }

  updateView(){
    BooksAPI.getAll().then((books) => {
      this.updateShelfs(books);
    });
  }

  updateShelfs(books){

    currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
    wantToRead = books.filter(book => book.shelf === 'wantToRead');
    read = books.filter(book => book.shelf === 'read');
    localStorage.setItem('library',JSON.stringify(books));
    this.setState({
      books,
      loading:false
    });
  }

  componentWillMount(){
    BooksAPI.getAll().then((books) => {
      this.updateShelfs(books);
    });
  }

  shouldComponentUpdate(nextProps,nextState) {
    let books = JSON.stringify(nextState.books) === JSON.stringify(this.state.books);

    return !books;
  }

  componentDidUpdate(){
    this.updateView();
  }


  render(){
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.state.loading ? <h2 style={{textAlign:'center'}} className="loading">Loading<span>.</span><span>.</span><span>.</span></h2> : ''}
            {currentlyReading.length > 0 ? <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ListBooks books={currentlyReading} handler={this.updateView}/>
              </div>
            </div> : ''}
            {wantToRead.length > 0 ?
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ListBooks books={wantToRead} handler={this.updateView}/>
              </div>
            </div> : ''}
            {read.length > 0 ?
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ListBooks books={read} handler={this.updateView}/>
              </div>
            </div> : ''}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookShelf
