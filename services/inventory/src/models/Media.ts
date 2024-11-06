import { DataTypes, Model, Sequelize } from 'sequelize';

export class Media extends Model {
  public id!: number;

  // Define model fields and their types
  public static initModel(sequelize: Sequelize) {
    Media.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    }, {
      sequelize,
      modelName: 'Media',
      tableName: 'inventory',
      timestamps: true,
    });
  }
}
