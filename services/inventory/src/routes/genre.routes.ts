import { GenreController } from '../controllers/genre.controller';
import { Routes } from './routes';

export class GenreRoutes extends Routes {
  private genreController: GenreController;

  constructor() {
    super();
    this.genreController = new GenreController();
    this.init();
  }

  protected initializeRoutes() {
    this.router.get('/', this.genreController.getGenres.bind(this.genreController));
  }
}
