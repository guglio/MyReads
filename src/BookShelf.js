import React from 'react'
import * as BooksAPI from './BooksAPI'
import {
  Link
} from 'react-router-dom'
import ListBooks from './ListBooks.js'
import './App.css'

class BookShelf extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      currentlyReading:[],
      wantToRead:[],
      read:[]
    };
  }

  componentWillMount(){
    BooksAPI.getAll().then((books) => {

      let shelfs;

      shelfs = books.reduce(function (bookShelfs, item) {
        let shelf = item.shelf;

        if (shelf in bookShelfs) {
          bookShelfs[shelf].push(item);
        }
        else {
          bookShelfs[shelf] = [];
          bookShelfs[shelf].push(item);
        }

        return bookShelfs;
      }, []);

      this.setState({
        currentlyReading:shelfs.currentlyReading,
        wantToRead:shelfs.wantToRead,
        read:shelfs.read
      })
    });

  }


  render(){
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ListBooks books={this.state.currentlyReading} />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ListBooks books={this.state.wantToRead} />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ListBooks books={this.state.read} />
              </div>
            </div>
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
