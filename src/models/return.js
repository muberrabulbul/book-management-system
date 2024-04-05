"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Return extends Model {
    static associate(models) {
      Return.belongsTo(models.User, { foreignKey: "userId" });

      Return.belongsTo(models.Book, { foreignKey: "bookId" });
    }
  }
  Return.init(
    {
      score: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Return",
    }
  );
  return Return;
};
