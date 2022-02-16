'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookAuthors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BookAuthors.init({
    book_id: {
      type:DataTypes.INTEGER,
      primaryKey: true
    },
    author_id: {
      type:DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'BookAuthors',
    tableName: 'bookauthors',
    timestamps: false
  });
  return BookAuthors;
};