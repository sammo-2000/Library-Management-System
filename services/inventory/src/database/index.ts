import {Sequelize} from 'sequelize';
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
    Author.hasMany(Media, {
        foreignKey: 'authorId',
    });
    Media.belongsTo(Author, {
        foreignKey: 'authorId',
    });

    Publisher.hasMany(Media, {
        foreignKey: 'publisherId',
    });
    Media.belongsTo(Publisher, {
        foreignKey: 'publisherId',
    });

    Genre.hasMany(Media, {
        foreignKey: 'genreId',
    });
    Media.belongsTo(Genre, {
        foreignKey: 'genreId',
    });

    City.hasMany(Branch, {
        foreignKey: 'cityId',
    });
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

  private populateDatabase = async () => {
    // Populate the database with example data
    try {
      // Create Authors
      const authors = await Author.bulkCreate([
        { name: 'Jane Austen' },
        { name: 'Mark Twain' },
        { name: 'Charles Dickens' },
        { name: 'Harper Lee' },
        { name: 'George Orwell' },
        { name: 'Herman Melville' },
        { name: 'Leo Tolstoy' },
        { name: 'F. Scott Fitzgerald' },
        { name: 'Aldous Huxley' },
        { name: 'J.D. Salinger' },
      ]);

      // Create Publishers
      const publishers = await Publisher.bulkCreate([
        { name: 'Penguin Books' },
        { name: 'HarperCollins' },
        { name: 'Random House' },
        { name: 'Simon & Schuster' },
        { name: 'Vintage Books' },
      ]);

      // Create Genres
      const genres = await Genre.bulkCreate([
        { genre: 'Fiction' },
        { genre: 'Science Fiction' },
        { genre: 'Biography' },
        { genre: 'Historical Fiction' },
        { genre: 'Dystopian' },
        { genre: 'Adventure' },
        { genre: 'Classic' },
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
          publishedDate: '1813-01-28',
        },
        {
          type: 'Book',
          title: 'Adventures of Huckleberry Finn',
          description: 'A novel by Mark Twain',
          authorId: authors[1].getDataValue('id'),
          publisherId: publishers[1].getDataValue('id'),
          genreId: genres[5].getDataValue('id'), // Adventure genre
          publishedDate: '1884-12-10',
        },
        {
          type: 'Book',
          title: 'Great Expectations',
          description: 'A novel by Charles Dickens',
          authorId: authors[2].getDataValue('id'),
          publisherId: publishers[2].getDataValue('id'),
          genreId: genres[0].getDataValue('id'), // Fiction genre
          publishedDate: '1861-08-01',
        },
        {
          type: 'Book',
          title: 'To Kill a Mockingbird',
          description: 'A novel by Harper Lee',
          authorId: authors[3].getDataValue('id'),
          publisherId: publishers[3].getDataValue('id'),
          genreId: genres[0].getDataValue('id'), // Fiction genre
          publishedDate: '1960-07-11',
        },
        {
          type: 'Book',
          title: '1984',
          description: 'A dystopian novel by George Orwell',
          authorId: authors[4].getDataValue('id'),
          publisherId: publishers[4].getDataValue('id'),
          genreId: genres[4].getDataValue('id'), // Dystopian genre
          publishedDate: '1949-06-08',
        },
        {
          type: 'Book',
          title: 'Moby Dick',
          description: 'A novel by Herman Melville',
          authorId: authors[5].getDataValue('id'),
          publisherId: publishers[0].getDataValue('id'),
          genreId: genres[6].getDataValue('id'), // Classic genre
          publishedDate: '1851-11-14',
        },
        {
          type: 'Book',
          title: 'War and Peace',
          description: 'A novel by Leo Tolstoy',
          authorId: authors[6].getDataValue('id'),
          publisherId: publishers[1].getDataValue('id'),
          genreId: genres[3].getDataValue('id'), // Historical Fiction genre
          publishedDate: '1869-01-01',
        },
        {
          type: 'Book',
          title: 'The Great Gatsby',
          description: 'A novel by F. Scott Fitzgerald',
          authorId: authors[7].getDataValue('id'),
          publisherId: publishers[2].getDataValue('id'),
          genreId: genres[6].getDataValue('id'), // Classic genre
          publishedDate: '1925-04-10',
        },
        {
          type: 'Book',
          title: 'Brave New World',
          description: 'A dystopian novel by Aldous Huxley',
          authorId: authors[8].getDataValue('id'),
          publisherId: publishers[3].getDataValue('id'),
          genreId: genres[4].getDataValue('id'), // Dystopian genre
          publishedDate: '1932-08-18',
        },
        {
          type: 'Book',
          title: 'The Catcher in the Rye',
          description: 'A novel by J.D. Salinger',
          authorId: authors[9].getDataValue('id'),
          publisherId: publishers[4].getDataValue('id'),
          genreId: genres[0].getDataValue('id'), // Fiction genre
          publishedDate: '1951-07-16',
        },
      ]);

      // Create Cities
      const cities = await City.bulkCreate([
        { city: 'Sheffield' },
        { city: 'London' },
        { city: 'Bristol' },
        { city: 'Manchester' },
        { city: 'Edinburgh' },
      ]);

      // Create Branches with associated Cities
      const branches = await Branch.bulkCreate([
        // Sheffield
        { name: 'Hallam', cityId: cities[0].getDataValue('id') },
        { name: 'Central Library', cityId: cities[0].getDataValue('id') },

        // London
        { name: 'Camden', cityId: cities[1].getDataValue('id') },
        { name: 'Kensington', cityId: cities[1].getDataValue('id') },
        { name: 'Westminster', cityId: cities[1].getDataValue('id') },

        // Bristol
        { name: 'Avonmouth', cityId: cities[2].getDataValue('id') },
        { name: 'Redland', cityId: cities[2].getDataValue('id') },

        // Manchester
        { name: 'Northern Quarter', cityId: cities[3].getDataValue('id') },
        { name: 'Didsbury', cityId: cities[3].getDataValue('id') },

        // Edinburgh
        { name: 'Leith', cityId: cities[4].getDataValue('id') },
        { name: 'Morningside', cityId: cities[4].getDataValue('id') },
      ]);

      // Create BranchMedia (quantity for media at branches)
      await BranchMedia.bulkCreate([
        // Sheffield - Hallam
        { quantity: 5, MediaId: mediaItems[0].getDataValue('id'), BranchId: branches[0].getDataValue('id') },
        { quantity: 2, MediaId: mediaItems[1].getDataValue('id'), BranchId: branches[0].getDataValue('id') },
        { quantity: 4, MediaId: mediaItems[2].getDataValue('id'), BranchId: branches[0].getDataValue('id') },

        // Sheffield - Central Library
        { quantity: 3, MediaId: mediaItems[0].getDataValue('id'), BranchId: branches[1].getDataValue('id') },
        { quantity: 1, MediaId: mediaItems[3].getDataValue('id'), BranchId: branches[1].getDataValue('id') },

        // London - Camden
        { quantity: 3, MediaId: mediaItems[1].getDataValue('id'), BranchId: branches[2].getDataValue('id') },
        { quantity: 6, MediaId: mediaItems[4].getDataValue('id'), BranchId: branches[2].getDataValue('id') },

        // London - Kensington
        { quantity: 2, MediaId: mediaItems[2].getDataValue('id'), BranchId: branches[3].getDataValue('id') },
        { quantity: 5, MediaId: mediaItems[5].getDataValue('id'), BranchId: branches[3].getDataValue('id') },

        // London - Westminster
        { quantity: 4, MediaId: mediaItems[6].getDataValue('id'), BranchId: branches[4].getDataValue('id') },
        { quantity: 3, MediaId: mediaItems[0].getDataValue('id'), BranchId: branches[4].getDataValue('id') },

        // Bristol - Avonmouth
        { quantity: 2, MediaId: mediaItems[2].getDataValue('id'), BranchId: branches[5].getDataValue('id') },
        { quantity: 3, MediaId: mediaItems[7].getDataValue('id'), BranchId: branches[5].getDataValue('id') },

        // Bristol - Redland
        { quantity: 5, MediaId: mediaItems[8].getDataValue('id'), BranchId: branches[6].getDataValue('id') },
        { quantity: 1, MediaId: mediaItems[3].getDataValue('id'), BranchId: branches[6].getDataValue('id') },

        // Manchester - Northern Quarter
        { quantity: 7, MediaId: mediaItems[4].getDataValue('id'), BranchId: branches[7].getDataValue('id') },
        { quantity: 4, MediaId: mediaItems[5].getDataValue('id'), BranchId: branches[7].getDataValue('id') },

        // Manchester - Didsbury
        { quantity: 3, MediaId: mediaItems[6].getDataValue('id'), BranchId: branches[8].getDataValue('id') },
        { quantity: 2, MediaId: mediaItems[9].getDataValue('id'), BranchId: branches[8].getDataValue('id') },

        // Edinburgh - Leith
        { quantity: 4, MediaId: mediaItems[7].getDataValue('id'), BranchId: branches[9].getDataValue('id') },
        { quantity: 5, MediaId: mediaItems[0].getDataValue('id'), BranchId: branches[9].getDataValue('id') },

        // Edinburgh - Morningside
        { quantity: 6, MediaId: mediaItems[8].getDataValue('id'), BranchId: branches[10].getDataValue('id') },
        { quantity: 2, MediaId: mediaItems[1].getDataValue('id'), BranchId: branches[10].getDataValue('id') },
        { quantity: 3, MediaId: mediaItems[3].getDataValue('id'), BranchId: branches[10].getDataValue('id') },
      ]);


      console.log("Database populated with example data!");

    } catch (error) {
      console.error("Error populating the database:", error);
    }
  };

}

export const database = new Database();
