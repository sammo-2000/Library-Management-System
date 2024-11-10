import { DataTypes, Model, Sequelize } from 'sequelize';

export default class City extends Model {

  // Define model fields and their types
  public static initModel(sequelize: Sequelize) {
    City.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      sequelize,
      modelName: 'City',
      tableName: 'Cities',
      timestamps: false,
    });
  }
}
