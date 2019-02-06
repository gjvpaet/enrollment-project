const express = require('express');

const router = express.Router();

const BookController = require('../controllers/books');

const checkAuth = require('../middlewares/checkAuth');

router.get('/', checkAuth, BookController.getAll);
router.post('/', checkAuth, BookController.createBook);
router.put('/:bookId', checkAuth, BookController.updateBook);
router.delete('/:bookId', checkAuth, BookController.deleteBook);

module.exports = router;