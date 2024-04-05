const { Book } = require("../models");

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (books.length === 0) {
      return res.status(404).json({ message: "No registered books❗️📚" });
    }
    res.json(books);
  } catch (error) {
    next(error);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findByPk(bookId, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!book) {
      return res.status(404).json({ error: "Book not found❗️📔" });
    }
    res.json(book);
  } catch (error) {
    next(error);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const { name } = req.body;
    const book = await Book.create({ name });
    const responseData = {
      id: book.id,
      name: book.name,
    };
    res.status(201).json(responseData);
  } catch (error) {
    next(error);
  }
};
