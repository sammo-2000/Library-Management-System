import { Router } from 'express';
import { AuthorController } from '../controllers/author.controller';

export class AuthorRoutes {
  public router: Router;
  private authorController: AuthorController;

  constructor() {
    this.router = Router();
    this.authorController = new AuthorController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.authorController.getAuthors.bind(this.authorController));
  }
}
