const Joi = require("joi");
const { User, Borrow, Return, Book } = require("../models");

const userSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Username is required❗️",
    "string.empty": "Username cannot be empty❗️",
  }),
});

const borrowSchema = Joi.object({
  userId: Joi.number().required().messages({
    "any.required": "User ID is required❗️",
  }),
  bookId: Joi.number().required().messages({
    "any.required": "Book ID is required❗️",
  }),
});

const returnSchema = Joi.object({
  userId: Joi.number().required().messages({
    "any.required": "User ID is required❗️",
  }),
  bookId: Joi.number().required().messages({
    "any.required": "Book ID is required❗️",
  }),
});

const validateUser = async (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { name } = req.body;
  const existingUser = await User.findOne({ where: { name } });
  if (existingUser) {
    return res
      .status(400)
      .json({ error: "A user with this name already exists❗️" });
  }

  next();
};

const validateBorrow = async (req, res, next) => {
  const { error } = borrowSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { userId, bookId } = req.params;

  const existingUser = await User.findByPk(userId);
  if (!existingUser) {
    return res.status(404).json({ error: "User not found❗️" });
  }

  const existingBook = await Book.findByPk(bookId);
  if (!existingBook) {
    return res.status(404).json({ error: "Book not found❗️" });
  }

  const existingBorrow = await Borrow.findOne({ where: { bookId } });
  if (existingBorrow) {
    return res.status(400).json({ error: "This book is already borrowed❗️" });
  }

  const existingReturn = await Return.findOne({ where: { userId, bookId } });
  if (existingReturn) {
    return res.status(400).json({ error: "This book is already returned❗️" });
  }

  const sameUserBorrow = await Borrow.findOne({ where: { userId, bookId } });
  if (sameUserBorrow) {
    return res
      .status(400)
      .json({ error: "This user already borrowed this book❗️" });
  }

  next();
};

const validateReturn = async (req, res, next) => {
  const { userId, bookId } = req.params;

  const { error: paramsError } = returnSchema.validate({
    userId: req.params.userId,
    bookId: req.params.bookId,
  });

  const existingUser = await User.findByPk(userId);
  if (!existingUser) {
    return res.status(404).json({ error: "User not found❗️" });
  }

  if (paramsError) {
    return res.status(400).json({ error: paramsError.details[0].message });
  }

  const existingBorrow = await Borrow.findOne({ where: { userId, bookId } });
  if (!existingBorrow) {
    return res.status(400).json({ error: "This book is not borrowed❗️" });
  }

  const existingReturn = await Return.findOne({ where: { userId, bookId } });
  if (existingReturn) {
    return res.status(400).json({ error: "This book is already returned❗️" });
  }

  next();
};

module.exports = { validateUser, validateBorrow, validateReturn };
