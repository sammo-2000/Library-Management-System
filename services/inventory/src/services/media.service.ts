import { ParsedQs } from 'qs';
import Media from '../models/Media';
import Author from '../models/Author';
import Genre from '../models/Genre';
import Publisher from '../models/Publisher';

//Business Logic Layer

export class MediaService {
  public async getMedia(query: ParsedQs) {
    const allowedQueryParams = ['type', 'title', 'author', 'genre', 'mediaId', 'cityId', 'branchId'];
    const filters: { [key: string]: string } = {};

    // Loop through allowed parameters and get only those present in req.query
    allowedQueryParams.forEach((param) => {
      if (query[param]) {
        filters[param] = query[param] as string;
      }
    });

    return await Media.findAll({
      where: filters,
      include: [Author, Genre, Publisher],
    });
  }
}
