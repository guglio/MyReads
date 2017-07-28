import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class Book extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired
  }

  constructor(props){
    super(props);

    this.shelfChange = this.shelfChange.bind(this);
    this.updateParent = this.updateParent.bind(this);
  }

  shelfChange(event){
    BooksAPI.update({id:this.props.book.id},event.target.value).then(() =>(
      this.updateParent()
    ));
  }

  updateParent(){
    if(this.props.handler)
      this.props.handler();
  }

  render() {
    let book = this.props.book,
        shelf = 'none';
    if(this.props.handler)
      shelf = this.props.book.shelf ? this.props.book.shelf : 'none';

    return(
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+book.imageLinks.thumbnail+')' }}></div>
            <div className="book-shelf-changer">
              <select value={shelf} onChange={(e) => this.shelfChange(e)}>
                <option value="" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
          {book.authors ? book.authors.map((authors,index) => <span key={index}>{authors}<br/></span>):''}</div>
        </div>
    )
  }
}

export default Book
