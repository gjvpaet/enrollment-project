const moment = require('moment');
const mongoose = require('mongoose');

const Book = require('../models/book');

exports.getAll = async (req, res) => {
    let { newToken } = req;

    try {
        let books = await Book.find().exec();

        const response = {
            newToken,
            list: books.map(book => {
                return {
                    Id: book._id,
                    Author: book.author,
                    Title: book.title,
                    Publisher: book.publisher,
                    PlaceOfPublication: book.placeOfPublication,
                    DateOfPublication: book.dateOfPublication,
                    CreatedAt: book.createdAt,
                    UpdatedAt: book.updatedAt
                }
            }),
            count: books.length,
            message: 'Items successfully fetched.'
        };

        res.status(200).json(response);
    } catch (error) {
        console.log('error: ', error);
    }
};

exports.createBook = async (req, res) => {
    let { newToken } = req;

    let {
        Author,
        Title,
        Publisher,
        PlaceOfPublication,
        DateOfPublication
    } = req.body;

    try {
        const book = new Book({
            _id: new mongoose.Types.ObjectId(),
            author: Author,
            title: Title,
            publisher: Publisher,
            placeOfPublication: PlaceOfPublication,
            dateOfPublication: DateOfPublication
        });

        let createdBook = await book.save();

        const response = {
            newToken,
            content: {
                Id: createdBook._id,
                Author: createdBook.author,
                Title: createdBook.title,
                Publisher: createdBook.publisher,
                PlaceOfPublication: createdBook.placeOfPublication,
                DateOfPublication: createdBook.dateOfPublication,
                CreatedAt: createdBook.createdAt,
                UpdatedAt: createdBook.updatedAt
            },
            message: 'Item successfully created.'
        };

        res.status(200).json(response);
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error });
    }
};

exports.updateBook = async (req, res) => {
    let { params, newToken } = req;
    let { bookId } = params;

    let {
        Author,
        Title,
        Publisher,
        PlaceOfPublication,
        DateOfPublication
    } = req.body;

    try {
        await Book.update(
            { _id: bookId },
            {
                $set: {
                    author: Author,
                    title: Title,
                    publisher: Publisher,
                    placeOfPublication: PlaceOfPublication,
                    dateOfPublication: DateOfPublication,
                    updatedAt: moment().format()
                }
            }
        ).exec();

        let updatedBook = await Book.findById(bookId).exec();

        const response = {
            newToken,
            content: {
                Id: updatedBook._id,
                Author: updatedBook.author,
                Title: updatedBook.title,
                Publisher: updatedBook.publisher,
                PlaceOfPublication: updatedBook.placeOfPublication,
                DateOfPublication: updatedBook.dateOfPublication,
                CreatedAt: updatedBook.createdAt,
                UpdatedAt: updatedBook.updatedAt
            },
            message: 'Item successfully updated.'
        };

        res.status(200).json(response);
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        let { newToken } = req;

        let { bookId } = req.params;

        let deletedBook = await Book.findOneAndRemove({ _id: bookId });

        res.status(200).json({ newToken, message: 'Item successfully deleted.' });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error });
    }
};