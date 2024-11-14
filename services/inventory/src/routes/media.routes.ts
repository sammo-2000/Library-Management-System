import { Router } from 'express';
import { MediaController } from '../controllers/media.controller';

export class MediaRoutes {
  public router: Router;
  private mediaController: MediaController;

  constructor() {
    this.router = Router();
    this.mediaController = new MediaController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.mediaController.getMedia.bind(this.mediaController));
  }
}
