const {Book, Author, genre} = require('../models')

//view all
module.exports.viewAll = async function(req, res){
    const books = await Book.findAll();
    res.render('books/view_all', {books});
}

//profile
module.exports.viewProfile = async function(req,res){
    const book = await Book.findByPk(req.params.id, {
        include: 'authors'
    });
    res.render('books/profile', {book})
}

//render add form
module.exports.renderAddForm = async function(req,res){
    const book = {
        title: '',
        genre: genres[0],
        pages: '',
        publisher: '',
        image: '',
        description: '',
    }
    res.render('books/add', {book, genre});
}

//add
module.exports.addBook = async function(req,res){
    const book = await Book.create( {
        title: req.body.title,
        genre: req.body.genre,
        pages: req.body.pages,
        publisher: req.body.publisher,
        image: req.body.image,
        description: req.body.description
    });
    res.redirect(`/books/profile/${book.id}`);
}

//render edit form
module.exports.renderEditForm = async function(req,res){
    const book = await Book.findByPk(req.params.id);
    res.render('books/edit', {book, genre});
}

//update
module.exports.updateBook = async function(req,res){
    const book = await Book.update({
        title: req.body.title,
        genre: req.body.genre,
        pages: req.body.pages,
        publisher: req.body.publisher,
        image: req.body.image,
        description: req.body.description
    }, {
        where: {
            id: req.params.id
        }
    });
    res.redirect(`/books/profile/${req.params.id}`);
}

//delete
module.exports.deleteBook = async function(req,res){
    await Book.destroy( {
        where: {
            id: req.params.id
        }
    });
    res.redirect('/books');
}