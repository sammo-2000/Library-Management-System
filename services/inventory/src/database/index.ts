import { Sequelize } from 'sequelize';
import DatabaseConfig from '../config/database.config';
import Author from '../models/Author';
import Branch from '../models/Branch';
import BranchMedia from '../models/BranchMedia';
import City from '../models/City';
import Genre from '../models/Genre';
import Media from '../models/Media';
import Publisher from '../models/Publisher';

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
    Author.initModel(this.sequelize);
    Branch.initModel(this.sequelize);
    BranchMedia.initModel(this.sequelize);
    City.initModel(this.sequelize);
    Genre.initModel(this.sequelize);
    Media.initModel(this.sequelize);
    Publisher.initModel(this.sequelize);
    this.defineModelRelationships();
  }

  private defineModelRelationships() {
    Author.hasMany(Media);
    Media.belongsTo(Author, {
        foreignKey: 'authorId',
    });

    Publisher.hasMany(Media);
    Media.belongsTo(Publisher, {
        foreignKey: 'publisherId',
    });

    Genre.hasMany(Media);
    Media.belongsTo(Genre, {
        foreignKey: 'genreId',
    });

    City.hasMany(Branch);
    Branch.belongsTo(City, {
        foreignKey: 'cityId',
    });

    Media.belongsToMany(Branch, {
        through: 'MediaBranch',
    });
    Branch.belongsToMany(Media, {
        through: 'MediaBranch',
    });
  }

  public async connect() {
    try {
      await this.sequelize.authenticate();

      // Synchronize models with database, force:true drops the table(s) first (full reset)
      await this.sequelize.sync({force: true});
      await this.populateDatabase();
      console.log('Connected to PostgreSQL, synchronized models and populated database!');
      } catch (error) {
        console.error('Database connection error:', error);
        throw error;
      }
  }

  private populateDatabase = async () => {
    // Populate the database with example data
    try {
      // Create Authors
      const authors = await Author.bulkCreate([
        { name: 'Jane Austen' },
        { name: 'Mark Twain' },
        { name: 'Charles Dickens' },
      ]);

      // Create Publishers
      const publishers = await Publisher.bulkCreate([
        { name: 'Penguin Books' },
        { name: 'HarperCollins' },
        { name: 'Random House' },
      ]);

      // Create Genres
      const genres = await Genre.bulkCreate([
        { genre: 'Fiction' },
        { genre: 'Science Fiction' },
        { genre: 'Biography' },
      ]);

      // Create Media with associated Authors, Publishers, and Genres
      const mediaItems = await Media.bulkCreate([
        {
          type: 'Book',
          title: 'Pride and Prejudice',
          description: 'A classic novel by Jane Austen',
          authorId: authors[0].getDataValue('id'),
          publisherId: publishers[0].getDataValue('id'),
          genreId: genres[0].getDataValue('id'),
        },
        {
          type: 'Book',
          title: 'Adventures of Huckleberry Finn',
          description: 'A novel by Mark Twain',
          authorId: authors[1].getDataValue('id'),
          publisherId: publishers[1].getDataValue('id'),
          genreId: genres[0].getDataValue('id'),
        },
        {
          type: 'Book',
          title: 'Great Expectations',
          description: 'A novel by Charles Dickens',
          authorId: authors[2].getDataValue('id'),
          publisherId: publishers[2].getDataValue('id'),
          genreId: genres[0].getDataValue('id'),
        },
      ]);

      // Create Cities
      const cities = await City.bulkCreate([
        { city: 'Sheffield' },
        { city: 'London' },
        { city: 'Bristol' },
      ]);

      // Create Branches with associated Cities
      const branches = await Branch.bulkCreate([
        { name: 'Hallam', cityId: cities[0].getDataValue('id') },
        { name: 'Camden', cityId: cities[1].getDataValue('id') },
        { name: 'Avonmouth', cityId: cities[2].getDataValue('id') },
      ]);

      // Create BranchMedia (quantity for media at branches)
      await BranchMedia.bulkCreate([
        { quantity: 5, MediaId: mediaItems[0].getDataValue('id'), BranchId: branches[0].getDataValue('id') },
        { quantity: 3, MediaId: mediaItems[1].getDataValue('id'), BranchId: branches[1].getDataValue('id') },
        { quantity: 2, MediaId: mediaItems[2].getDataValue('id'), BranchId: branches[2].getDataValue('id') },
      ]);

      console.log("Database populated with example data!");

    } catch (error) {
      console.error("Error populating the database:", error);
    }
  };

}

export const database = new Database();
