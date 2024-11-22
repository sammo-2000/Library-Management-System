import { MediaController } from '../controllers/media.controller';
import { Routes } from './routes';

export class MediaRoutes extends Routes {
  private mediaController: MediaController;

  constructor() {
    super();
    this.mediaController = new MediaController();
    this.init();
  }

  protected initializeRoutes() {
    this.router.get('/', this.mediaController.getMedia.bind(this.mediaController));
  }
}
