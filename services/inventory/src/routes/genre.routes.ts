import { Router } from 'express';
import { GenreController } from '../controllers/genre.controller';

export class GenreRoutes {
  public router: Router;
  private genreController: GenreController;

  constructor() {
    this.router = Router();
    this.genreController = new GenreController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.genreController.getGenres.bind(this.genreController));
  }
}
