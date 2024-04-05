const { body, validationResult } = require("express-validator");
const { Book } = require("../models");

exports.createBookValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required❗️")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long❗️")
    .custom(async (value) => {
      const existingBook = await Book.findOne({ where: { name: value } });
      if (existingBook) {
        throw new Error("A book with the same name already exists❗️");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
