"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.hasMany(models.Borrow, { foreignKey: "bookId" });
    }
  }
  Book.init(
    {
      name: DataTypes.STRING,
      score: {
        type: DataTypes.DOUBLE,
        defaultValue: -1.0,
      },
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
