import React from 'react'
import PropTypes from 'prop-types'

class ListBooks extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  render() {
    let showBooks = this.props.books;

    return(
      <ol className="books-grid">
        {showBooks.map((books) => (
          <li key={books.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+books.imageLinks.thumbnail+')' }}></div>
                <div className="book-shelf-changer">
                  <select>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{books.title}</div>
              <div className="book-authors">
              {books.authors ? books.authors.map((authors) => <span>{authors}<br/></span>):''}</div>
            </div>
          </li>
        ))}
      </ol>
    )
  }
}

export default ListBooks
