import { Request, Response } from 'express';
import { MediaService } from '../services/media.service';

// The MediaController class is responsible for handling requests to the /media endpoint.
// Any business logic should be delegated to the MediaService class.

export class MediaController {
  private mediaService: MediaService;

  constructor() {
    this.mediaService = new MediaService();
  }

  public async getMediaById(req: Request, res: Response) {
    try {
      const media = await this.mediaService.getMediaById(req.params.id);
      res.json(media);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  public async getAllMedia(req: Request, res: Response) {
    try {
      const {media, total} = await this.mediaService.getAllMedia(req.query);
      res.json({media, total});
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}
