var express = require('express');
var router = express.Router();
const bookController = require('../controllers/bookController');
const authorController = require('../controllers/authorController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/authors', authorController.viewAll);

module.exports = router;
