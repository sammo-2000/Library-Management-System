import { DataTypes, Model, Sequelize } from 'sequelize';

export default class Genre extends Model {

  // Define model fields and their types
  public static initModel(sequelize: Sequelize) {
    Genre.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      sequelize,
      modelName: 'Genre',
      tableName: 'Genres',
      timestamps: false,
    });
  }
}
