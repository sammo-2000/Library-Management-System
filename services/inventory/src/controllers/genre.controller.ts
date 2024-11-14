import { Request, Response } from 'express';
import { GenreService } from '../services/genre.service';

// The Controller class is responsible for handling requests to the endpoint.
// Any business logic should be delegated to the Service class.

export class GenreController {
  private genreService: GenreService;

  constructor() {
    this.genreService = new GenreService();
  }

  public async getGenres(req: Request, res: Response) {
    try{
      const genres = await this.genreService.getGenres();
      res.json(genres);
    }
    catch(error: any){
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}
