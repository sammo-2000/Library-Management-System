import { Request, Response } from 'express';
import { PublisherService } from '../services/publisher.service';

// The Controller class is responsible for handling requests to the endpoint.
// Any business logic should be delegated to the Service class.

export class PublisherController {
  private publisherService: PublisherService;

  constructor() {
    this.publisherService = new PublisherService();
  }

  public async getPublishers(req: Request, res: Response) {
    try{
        const publishers = await this.publisherService.getPublishers();
        res.json(publishers);
    }
    catch(error: any){
        res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}
