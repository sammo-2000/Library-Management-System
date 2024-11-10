import Author from "./Author";
import Branch from "./Branch";
import City from "./City";
import Genre from "./Genre";
import Media from "./Media";

// Define model relationships
export default function defineModelRelationships() {
    Media.hasOne(Author, {
    foreignKey: 'authorId',
    });
    Author.hasMany(Media, {
    foreignKey: 'authorId',
    });

    Media.hasOne(Genre, {
    foreignKey: 'genreId',
    });
    Genre.hasMany(Media, {
    foreignKey: 'genreId',
    });

    Branch.hasOne(City, {
    foreignKey: 'cityId',
    });
    City.hasMany(Branch, {
        foreignKey: 'cityId',
    });

    Media.belongsToMany(Branch, {
    through: 'MediaBranch',
    });
    Branch.belongsToMany(Media, {
    through: 'MediaBranch',
    });
};