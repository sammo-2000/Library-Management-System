import { DataTypes, Model, Sequelize } from 'sequelize';

export default class BranchMedia extends Model {

  // Define model fields and their types
  public static initModel(sequelize: Sequelize) {
    BranchMedia.init({
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'BranchMedia',
      tableName: 'BranchMedia',
      timestamps: false,
    });
  }
}
