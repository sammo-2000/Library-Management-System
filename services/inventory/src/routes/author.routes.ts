import { AuthorController } from '../controllers/author.controller';
import { Routes } from './routes';

export class AuthorRoutes extends Routes {
  private authorController: AuthorController;

  constructor() {
    super();
    this.authorController = new AuthorController();
    this.init();
  }

  protected initializeRoutes() {
    this.router.get('/', this.authorController.getAuthors.bind(this.authorController));
  }
}
