"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Borrow extends Model {
    static associate(models) {
      Borrow.belongsTo(models.User, { foreignKey: "userId" });

      Borrow.belongsTo(models.Book, { foreignKey: "bookId" });
    }
  }
  Borrow.init(
    {},
    {
      sequelize,
      modelName: "Borrow",
    }
  );
  return Borrow;
};
