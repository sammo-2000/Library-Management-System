import { DataTypes, Model, Sequelize } from 'sequelize';

export default class Publisher extends Model {

  // Define model fields and their types
  public static initModel(sequelize: Sequelize) {
    Publisher.init({
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
      modelName: 'Publisher',
      tableName: 'Publishers',
      timestamps: false,
    });
  }
}
