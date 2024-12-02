import Author from "./Author";
import Branch from "./Branch";
import City from "./City";
import Genre from "./Genre";
import Media from "./Media";
import Publisher from "./Publisher";


// Define model relationships
export default function defineModelRelationships() {
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
};