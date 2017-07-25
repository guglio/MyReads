import React from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks.js'
import './App.css'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      searchResult: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({search: event.target.value});

    BooksAPI.search(event.target.value,20).then((books) => {
      this.setState({searchResult: books})
    });
  }

  render(){

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" value={this.state.search} onChange={this.handleChange}/>

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
