const express = require("express");
const router = express.Router();
const BookController = require("../controllers/bookController");
const { createBookValidator } = require("../validators/bookValidator");

router.get("/", BookController.getAllBooks);

router.get("/:id", BookController.getBookById);

router.post("/", createBookValidator, BookController.createBook);

module.exports = router;
