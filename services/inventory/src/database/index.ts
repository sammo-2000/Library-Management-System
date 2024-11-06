import { Sequelize } from 'sequelize';
import DatabaseConfig from '../config/database.config';

class Database {
  public sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize(
      DatabaseConfig.db,
      DatabaseConfig.user,
      DatabaseConfig.password,
      DatabaseConfig.options
    );
    this.initializeModels();
  }

  private initializeModels() {
    //Initialize models here
  }

  public async connect() {
    try {
      await this.sequelize.authenticate();
      await this.sequelize.sync();
      console.log('Connected to PostgreSQL and synchronized models');
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  }
}

export const database = new Database();
