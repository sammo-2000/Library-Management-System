import { Media } from '../models/Media';

export class MediaService {
  public async getMedia() {
    //TODO: Implement method
    return await Media.findAll();
  }
}
