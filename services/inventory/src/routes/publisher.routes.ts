import { Router } from 'express';
import { PublisherController } from '../controllers/publisher.controller';

export class PublisherRoutes {
  public router: Router;
  private publisherController: PublisherController;

  constructor() {
    this.router = Router();
    this.publisherController = new PublisherController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.publisherController.getPublishers.bind(this.publisherController));
  }
}
