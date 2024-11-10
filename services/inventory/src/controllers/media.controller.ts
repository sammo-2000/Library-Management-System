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
    const media = await this.mediaService.getMedia();
    res.json(media);
  }
}
