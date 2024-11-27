import { ParsedQs } from 'qs';
import Media from '../models/Media';
import Author from '../models/Author';
import Genre from '../models/Genre';
import Publisher from '../models/Publisher';
import { BadRequestError } from '../errors';
import { Op } from 'sequelize';

//Business Logic Layer

export class MediaService {
  public async getMedia(query: ParsedQs) {
    const allowedQueryParams = ['type', 'title', 'authorId', 'genreId', 'mediaId', 'cityId', 'branchId'];
    const filters: { [key: string]: any } = {};

    // Loop through allowed parameters and get only those present in req.query
    allowedQueryParams.forEach((param) => {
      if (query[param]) {
        if (param === 'title'){
          filters[param] = { [Op.iLike]: `%${query.title}%` };
        }
        else{
          filters[param] = query[param];
        }
      }
    });

    // Handle page query parameter for pagination
    const page = query.page ? parseInt(query.page as string, 10) : 1;
    if (isNaN(page)) {
      throw new BadRequestError('Query parameter page should be a number');
    }
    if (page < 1) {
      throw new BadRequestError('Query parameter page should be a positive number');
    }

    //20 items per page
    const limit = 20;
    const offset = (page - 1) * limit;

    const {count : total, rows: media} = await Media.findAndCountAll({
      where: filters,
      include: [Author, Genre, Publisher],
      attributes: { exclude: ['authorId', 'genreId', 'publisherId', 'createdAt', 'updatedAt'] },
      limit,
      offset,
      distinct: true,
    });
    return { media, total };
  }
}
