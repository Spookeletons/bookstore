const {Author} = require('../models')

//view all
module.exports.viewAll = async function(req, res){
    const authors = Author.findAll();
    res.render('course/view_all', {authors});
}

//profile


//render add form


//add


//render edit form


//update


//delete