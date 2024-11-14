import { DataTypes, Model, Sequelize } from 'sequelize';

export default class Author extends Model {

  // Define model fields and their types
  public static initModel(sequelize: Sequelize) {
    Author.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      sequelize,
      modelName: 'Author',
      tableName: 'Authors',
      timestamps: false,
    });
  }
}
