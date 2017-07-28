# MyReads

Web application that handle a personal library, with separate 'shelfs' for your books.
The user can perform a search to add additional books to the library.

You can see a running version of this web application here:   
    [https://guglio.github.io/MyReads/](https://guglio.github.io/MyReads/)


## Structure of the web app

Project folder content:

```ANSI
.
├── CONTRIBUTING.md
├── README.md
├── SEARCH_TERMS.md
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── Book.js
    ├── BookShelf.js
    ├── BooksAPI.js
    ├── ListBooks.js
    ├── Search.js
    ├── icons
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   ├── arrow-drop-down.svg
    │   └── cover404.jpg
    ├── index.css
    └── index.js
```
Structure of the web app

```ANSI
index.js
  └── App.js
        └── BookShelf.js
                  ├── ListBooks.js
                  │      └── ListBooks.js
                  │                └── Book.js
                  └── Search.js
                         └── ListBooks.js
                                   └── Book.js
```

- **index.js**: render the App to the document
- **App.js**: handle the routes of the web app, display the first component (**BookShelf.js**)
- **Search.js**: component to handle the search in the database
- **ListBooks.js**: This component has the following tasks:
    - get the array of books and feed it to the `Book` component (**Book.js**)
    - in case the `ListBooks` component has the `handler` props, it pass to the `Book` component
- **Book.js**: display a single book. This component, detect if the user change the shelf, and if it's within the `Search` component (no `handler` props) it simply add to the backend server with the other books of your personal library. If this component is created from the `BookShelf` (`handler` props present), it pass the change to the parent's parent (see the structure before), and tell him to update the shelf, and re-render the `ListBooks`.

## Backend Server

Backend server to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you needed to perform necessary operations on the backend:

### `getAll()`
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update(book, shelf)`
* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search(query, maxResults)`
* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need a local machine with [Node.js](https://nodejs.org/en/) installed and [npm](https://www.npmjs.com/) to install the required packages

### Installing

To install this project, you need to clone or download the repository (more info [here](https://help.github.com/articles/cloning-a-repository/) on how to clone with different platforms):

**MacOS**

Open terminal and type:
```shell
git clone https://github.com/guglio/MyReads.git
```

## Running the tests

To start the development environment, open terminal and type:
```shell
npm start
```

## Create a production version

When you're ready to deploy to production, open terminal and type:
```shell
npm run build
```
will create an optimized build of your app in the build folder.

## Push to GitHub Pages

When you want to show a running version of this project (or in general every project) through GitHub Pages, you need to follow this [guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#github-pages) and, because I've used `react-router-dom`

## Built With

* [React](https://facebook.github.io/react/) - The heart of the web application
* [npm](https://www.npmjs.com/) - Package manager
* [starter template](https://github.com/udacity/reactnd-project-myreads-starter) - starter template for the final assessment project for Udacity's React Fundamentals course
* [Atom](https://atom.io/) - text editor

## Versioning

I use git for versioning.

## Author

[Guglielmo Turco](https://github.com/guglio)
