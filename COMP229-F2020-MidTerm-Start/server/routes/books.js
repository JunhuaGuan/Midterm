// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books = require('../models/books');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    res.render("views/books/details.ejs",{title:'add book'})


});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    // use the infomation the user enter then create a book

     let newbooks = book({
      "Title": req.body.title,
      "description": req.body.description,
      "price": req.body.price,
      "author": req.body.author,
      "genre": req.body.genre
  });
    
    book.create(newbooks, (err, book) =>{
      if(err)
      {
        console.log(err)
        res.end(err)
      }
      else
      {
        res.redirect('/books')
      }
    })

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let id = req.params.id

    book.findById(id, (err, bookedit) => {
      if(err)
      {
        console.log(err)
        res.end(err)
      }
      else
      {
        res.render('views/books/details.ejs', {title: 'EditBook', book: bookToEdit,})
      }

    })
    
    

});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    // update the book infomation then redirect the user back to the book page

    let id = req.params.id

    let updatebooks = book({
      "Title": req.body.title,
      "description": req.body.description,
      "price": req.body.price,
      "author": req.body.author,
      "genre": req.body.genre
  });

     book.update({_id: id}, updatebooks, (err) => {
       if(err)
       {
         console.log(err)
         res.end(err)
       }
       else
       {
         res.redirect('/books')
       }
     })
 
 });

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    // remove books then redirect the user back to the book page

    let id = req.params.id

    book.remove({_id: id}, (err) => {
      if(err)
      {
        console.log(err)
        res.end(err)
      }
      else
      {
        res.redirect('/books')
      }
    })

});


module.exports = router;
