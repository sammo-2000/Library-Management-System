import { ParsedQs } from 'qs';
import Media from '../models/Media';
import Author from '../models/Author';
import Genre from '../models/Genre';
import Publisher from '../models/Publisher';
import { BadRequestError, NotFoundError } from '../errors';
import { Op } from 'sequelize';
import Branch from '../models/Branch';
import BranchMedia from '../models/BranchMedia';
import City from '../models/City';

//Business Logic Layer

export class MediaService {

  public async getMediaById(rawMediaId: string) {
    const mediaId = parseInt(rawMediaId, 10);
    if (isNaN(mediaId)) {
      throw new BadRequestError('Media ID should be a number');
    }
    const media = await Media.findByPk(mediaId, {
      include: [Author, Genre, Publisher],
      attributes: ['id', 'type', 'title', 'description', 'publishedDate'],
    });
    if (!media) {
      throw new NotFoundError('Media not found');
    }
    return media;
  }

  public async getAllMedia(query: ParsedQs) {
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

    const {
        type,
        title,
        authorId,
        genreId,
        mediaId,
        cityId,
        branchId,
    } = query;

    // Base where clause for the Media model
    const mediaWhere: any = {};
    if (type) mediaWhere.type = type;
    if (title) mediaWhere.title = { [Op.iLike]: `%${title}%` };
    if (authorId) mediaWhere.authorId = authorId;
    if (genreId) mediaWhere.genreId = genreId;
    if (mediaId) mediaWhere.id = mediaId;

    // Include array to dynamically add associations
    const include = [];

    // Add condition for branchId or cityId
    if (branchId) {
        include.push({
            model: BranchMedia,
            attributes: [], // Exclude BranchMedia data
            where: {
                BranchId: branchId,
                quantity: { [Op.gt]: 0 },
            },
            required: true, // Ensure only matching Media are returned
        });
    } else if (cityId) {
         // Filter by cityId (find media in any branch in the city with quantity > 0)
        include.push({
            model: BranchMedia,
            attributes: [], // Exclude join table data
            required: true, // Enforce filtering on BranchMedia
            duplicating: false, // Prevent duplicate rows
            where: {
                quantity: { [Op.gt]: 0 },
            },
            include: [
                {
                    model: Branch,
                    attributes: [], // Exclude branch data
                    required: true, // Enforce filtering on Branch
                    duplicating: false, // Prevent duplicate rows
                    include: [
                        {
                            model: City,
                            where: { id: cityId },
                            attributes: [], // Exclude city data
                            required: true, // Enforce filtering on City
                            duplicating: false, // Prevent duplicate rows
                        },
                    ],
                },
            ],
        });
    }

    // Include related models if needed (e.g., Author, Publisher, Genre)
    include.push(
        { model: Author },
        { model: Publisher },
        { model: Genre }
    );
    const {rows: media, count: total} = await Media.findAndCountAll({
      where: mediaWhere,
      include: include,
      attributes: ['id', 'type', 'title', 'description', 'publishedDate'],
      limit,
      offset,
      distinct: true,
    });
    return { media, total };
  }
}
