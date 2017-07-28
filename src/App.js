import React from 'react'
import {
  HashRouter as Router,
  // HashRouter,
  Route
} from 'react-router-dom'
import Search from './Search.js'
import BookShelf from './BookShelf.js'
import './App.css'

class BooksApp extends React.Component {
  render() {
    return (
      <Router >
        <div className="app">
          <Route exact path="/" component={BookShelf} />
          <Route path="/search" component={Search} />
        </div>
      </Router>
    )
  }
}

export default BooksApp
