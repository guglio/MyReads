import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book.js'

class ListBooks extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  render() {
    if(this.props.handler)
      return(
        <ol className="books-grid">
          {this.props.books.map((books,index) => (
            <li key={index}>
              <Book book={books} handler={this.props.handler}/>
            </li>
          ))}
        </ol>
      )
    else
      return(
        <ol className="books-grid">
          {this.props.books.map((books,index) => (
            <li key={index}>
              <Book book={books}/>
            </li>
          ))}
        </ol>
      )
  }
}

export default ListBooks
