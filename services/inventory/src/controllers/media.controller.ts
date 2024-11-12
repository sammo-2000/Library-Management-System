import { Request, Response } from 'express';
import { MediaService } from '../services/media.service';

// The MediaController class is responsible for handling requests to the /media endpoint.
// Any business logic should be delegated to the MediaService class.

export class MediaController {
  private mediaService: MediaService;

  constructor() {
    this.mediaService = new MediaService();
  }

  public async getMedia(req: Request, res: Response) {
    try {
      const media = await this.mediaService.getMedia(req.query);
      res.json(media);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
