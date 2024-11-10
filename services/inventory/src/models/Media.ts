import { DataTypes, Model, Sequelize } from 'sequelize';

export default class Media extends Model {

  // Define model fields and their types
  public static initModel(sequelize: Sequelize) {
    Media.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      }
    }, {
      sequelize,
      modelName: 'Media',
      tableName: 'Media',
      timestamps: true,
    });
  }
}
