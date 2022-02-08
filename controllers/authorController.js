const {Author} = require('../models')

//view all
module.exports.viewAll = async function(req, res){
    const authors = await Author.findAll();
    res.render('authors/view_all', {authors});
}

//profile
module.exports.viewProfile = async function(req,res){
    const author = await Author.findByPk(req.params.id);
    res.render('authors/profile', {author})
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
    res.redirect(`/authors/profile/${author.id}`);
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
    res.redirect(`/authors/profile/${req.params.id}`);
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