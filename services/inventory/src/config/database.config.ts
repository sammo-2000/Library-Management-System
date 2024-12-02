import { Dialect } from "sequelize";

class DatabaseConfig {
  public static readonly db = process.env.DB_NAME as string;
  public static readonly user = process.env.DB_USER as string;
  public static readonly password = process.env.DB_PASSWORD as string;
  public static readonly options = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres' as Dialect,
    logging: true,
  };
}

export default DatabaseConfig;


