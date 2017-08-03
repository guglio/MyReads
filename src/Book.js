import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class Book extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired
  }

  constructor(props){
    super(props);
    this.state = {
      shelf:this.props.book.shelf
    }
    this.shelfChange = this.shelfChange.bind(this);
    this.updateParent = this.updateParent.bind(this);
    this.setShelf = this.setShelf.bind(this);
  }

  setShelf(){
    if(!this.props.handler){
      let that = this;
      BooksAPI.getAll().then((books) => {
        let book = books.filter(currBook  => currBook.id === that.props.book.id);
        if(book.length === 1)
          that.setState({shelf:book[0].shelf});
        else
          that.setState({shelf:'none'});
      });
    }
  }

  shelfChange(event){
    this.setState({shelf:event.target.value});
    BooksAPI.update({id:this.props.book.id},event.target.value).then(() =>{
      this.updateParent();
    });
  }

  updateParent(){
    if(this.props.handler)
      this.props.handler();
  }

  componentDidMount(){
    this.setShelf();
  }
  render() {
    let book = this.props.book;

    return(
        <div className="book" id={book.id}>
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+book.imageLinks.thumbnail+')' }}></div>
            {this.state.shelf !== 'hide' ?
              <div className="book-shelf-changer">
                <select value={this.state.shelf} onChange={(e) => this.shelfChange(e)}>
                  <option value="" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
             : ''}
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
          {book.authors ? book.authors.map((authors,index) => <span key={index}>{authors}<br/></span>):''}</div>
        </div>
    )
  }
}

export default Book
