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
    this.shelfCheck = this.shelfCheck.bind(this);
  }

  shelfCheck(){
    if(!this.props.handler){
      let that = this;
      let book = JSON.parse(localStorage.getItem('library')).filter(book =>
        book.id === that.props.book.id);
      if(book.length === 1)
        this.setState({shelf:book.shelf});
    }
  }

  shelfChange(event){
    this.setState({shelf:event.target.value});
    BooksAPI.update({id:this.props.book.id},event.target.value).then((data) =>{
      localStorage.setItem('data', data);
      this.updateParent();
    });
  }

  updateParent(){
    if(this.props.handler)
      this.props.handler();
  }

  componentWillMount(){
    this.shelfCheck();
  }
  render() {
    let book = this.props.book;

    return(
        <div className="book">
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
