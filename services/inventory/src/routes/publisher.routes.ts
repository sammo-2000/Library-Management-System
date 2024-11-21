import { PublisherController } from '../controllers/publisher.controller';
import { Routes } from './routes';

export class PublisherRoutes extends Routes{
  private publisherController: PublisherController;

  constructor() {
    super();
    this.publisherController = new PublisherController();
    this.init();
  }

  protected initializeRoutes() {
    this.router.get('/', this.publisherController.getPublishers.bind(this.publisherController));
  }
}
