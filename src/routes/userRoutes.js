const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const {
  validateUser,
  validateBorrow,
  validateReturn,
} = require("../validators/userValidator");

router.get("/", UserController.getAllUsers);

router.post("/", validateUser, UserController.createUser);

router.get("/:id", UserController.getUserById);

router.post(
  "/:userId/borrow/:bookId",
  validateBorrow,
  UserController.borrowBook
);

router.post(
  "/:userId/return/:bookId",
  validateReturn,
  UserController.returnBook
);

module.exports = router;
