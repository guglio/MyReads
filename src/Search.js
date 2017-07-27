import React from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks.js'
import PropTypes from 'prop-types'
import './App.css'
import cover404 from './icons/cover404.jpg'

var notFoundBook = [{
  imageLinks:{thumbnail : cover404},
  title : 'Books not found',
}];

class Search extends React.Component {
  static propTypes = {
    searchResult: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.state = {
      searchResult: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if(event.target.value !== '' )
      BooksAPI.search(event.target.value,20).then((books) => {
        books.error ? this.setState({searchResult: notFoundBook}) : this.setState({searchResult: books});
      });
    else
      this.setState({searchResult: []});
  }

  render(){

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.handleChange}/>
          </div>
        </div>
        <div className="search-books-results">
          <ListBooks books={this.state.searchResult} />
        </div>
      </div>
    )
  }
}

export default Search
