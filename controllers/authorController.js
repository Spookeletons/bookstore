const {Author, Book, BookAuthors} = require('../models')

//view all
module.exports.viewAll = async function(req, res){
    const authors = await Author.findAll();
    res.render('authors/view_all', {authors});
}

//profile
module.exports.viewProfile = async function(req,res){
    const author = await Author.findByPk(req.params.id, {
        include: 'books'
    });
    const books = await Book.findAll();
    let availableBooks = [];
    for(let i=0;i<books.length;i++){
        if(!authorHasBook(author,books[i])){
            availableBooks.push(books[i]);
        }
    }
    res.render('authors/profile', {author, availableBooks})
}

//render add form
module.exports.renderAddForm = async function(req,res){
    const author = {
        first: '',
        last: '',
        dob: ''
    }
    res.render('authors/add', {author});
}

//add
module.exports.addAuthor = async function(req,res){
    const author = await Author.create( {
        first: req.body.first,
        last: req.body.last,
        dob: req.body.dob
    });
    res.redirect(`/authors`);
}

//render edit form
module.exports.renderEditForm = async function(req,res){
    const author = await Author.findByPk(req.params.id);
    res.render('authors/edit', {author})
}

//update
module.exports.updateAuthor = async function(req,res){
    const author = await Author.update({
        first: req.body.first,
        last: req.body.last,
        dob: req.body.dob
        }, {
        where: {
            id: req.params.id
        }
        });
    res.redirect(`/authors`);
}

//delete
module.exports.deleteAuthor = async function(req,res){
    await Author.destroy( {
        where: {
            id: req.params.id
        }
    });
    res.redirect('/authors');
}
function authorHasBook(author, book){
    for(let i=0;i<author.books.length;i++){
        if(author.id === author.books[i].id){
            return true
        }
    }
    return false
}

//Add book to author
module.exports.addBookToAuthor = async function(req,res){
    await BookAuthors.create({
        author_id:req.params.author_id,
        book_id:req.body.book_id
    })
    res.redirect(`/authors/profile/${req.params.author_id}`);
}

//delete book from an author
module.exports.removeBook = async function(req,res) {
    await BookAuthors.destroy({
        where: {
            book_id: req.params.book_id,
            author_id: req.params.author_id
        }
    });
    res.redirect(`/authors/profile/${req.params.author_id}`);
}