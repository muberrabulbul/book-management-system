const { User, Borrow, Book, Return } = require("../models");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (users.length === 0) {
      return res.status(404).json({ message: "No registered users❗️👤" });
    }
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { name } = req.body;
    const user = await User.create({ name });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found❗️👤" });
    }

    const returns = await Return.findAll({ where: { userId: user.id } });
    const borrows = await Borrow.findAll({ where: { userId: user.id } });

    const pastBooks = await Promise.all(
      returns.map(async (ret) => {
        const book = await Book.findByPk(ret.bookId);
        return {
          name: book ? book.name : "Unknown Book",
          score: ret.score,
        };
      })
    );

    const presentBooks = await Promise.all(
      borrows.map(async (borrow) => {
        const book = await Book.findByPk(borrow.bookId);
        return { name: book ? book.name : "Unknown Book" };
      })
    );

    res.json({
      id: user.id,
      name: user.name,
      books: { past: pastBooks, present: presentBooks },
    });
  } catch (error) {
    next(error);
  }
};

exports.borrowBook = async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookId = req.params.bookId;

    const borrow = await Borrow.create({ userId, bookId });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.returnBook = async (req, res, next) => {
  try {
    const defaultScore = -1.0;

    const userId = req.params.userId;
    const bookId = req.params.bookId;
    const { score } = req.body;
    if (!(score == defaultScore || score >= 0.0)) {
      return res.status(400).json({ message: "Invalid score❗️" });
    }

    const newReturn = await Return.create({ score, userId, bookId });

    await Borrow.destroy({ where: { userId, bookId } });

    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found❗️📔" });
    }
    if (book.score == defaultScore) {
      book.score = score;
    } else {
      const currentScore = book.score;
      const totalCount = await Return.count({ where: { bookId } });
      const newAverage = (currentScore * (totalCount - 1) + score) / totalCount;
      book.score = newAverage;
    }

    await book.save();
    const responseData = {
      id: newReturn.id,
      score: newReturn.score,
      userId: newReturn.userId,
      bookId: newReturn.bookId,
    };
    res.status(201).json(responseData);
  } catch (error) {
    next(error);
  }
};
