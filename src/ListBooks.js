import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book.js'

class ListBooks extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  render() {
    let showBooks = this.props.books;

    return(
      <ol className="books-grid">
        {showBooks.map((books,index) => (
          <li key={index}>
            <Book book={books} />
          </li>
        ))}
      </ol>
    )
  }
}

export default ListBooks
