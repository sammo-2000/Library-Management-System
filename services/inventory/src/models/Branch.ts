import { DataTypes, Model, Sequelize } from 'sequelize';

export default class Branch extends Model {

  // Define model fields and their types
  public static initModel(sequelize: Sequelize) {
    Branch.init({
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
      modelName: 'Branch',
      tableName: 'Branches',
      timestamps: false,
    });
  }
}
