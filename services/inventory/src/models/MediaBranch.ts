import { DataTypes, Model, Sequelize } from 'sequelize';

export default class MediaBranch extends Model {

  // Define model fields and their types
  public static initModel(sequelize: Sequelize) {
    MediaBranch.init({
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'MediaBranch',
      tableName: 'MediaBranch',
      timestamps: false,
    });
  }
}
