import { MediaService } from '../services/media.service';
import Media from '../models/Media';
import { BadRequestError } from '../errors';
import { jest } from '@jest/globals';

jest.mock('../models/Media'); // Mock the Media model

describe('MediaService - getAllMedia', () => {
  const mediaService = new MediaService();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should throw BadRequestError if page is not a number', async () => {
    const query = { page: 'invalid' };
    await expect(mediaService.getAllMedia(query)).rejects.toThrow(BadRequestError);
  });

  test('should throw BadRequestError if page is less than 1', async () => {
    const query = { page: '0' };
    await expect(mediaService.getAllMedia(query)).rejects.toThrow(BadRequestError);
  });

  
});
