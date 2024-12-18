import { MediaService } from '../services/media.service';
import Media from '../models/Media';
import { BadRequestError } from '../errors';
import { jest } from '@jest/globals';

jest.mock('../models/Media', () => ({
  findAndCountAll: jest.fn(() => Promise.resolve({
    rows: [
      { id: 1, type: 'book', title: 'Title 1', description: 'Desc 1', publishedDate: '2023-01-01' },
      { id: 2, type: 'ebook', title: 'Title 2', description: 'Desc 2', publishedDate: '2023-01-02' },
    ],
    count: 50,
  })),
})); // Mock the Media model

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

  test('should call findAndCountAll with correct arguments', async () => {
    // Call the method in your service
    const mediaService = new MediaService();
    const query = { page: '2' };

    const result = await mediaService.getAllMedia(query);

    // Assertions
    expect(Media.findAndCountAll).toHaveBeenCalled(); // Ensure it was called
    expect(Media.findAndCountAll).toHaveBeenCalledWith({
      where: {}, // Example: depends on the query logic
      include: expect.any(Array),
      attributes: ['id', 'type', 'title', 'description', 'publishedDate'],
      limit: 20,
      offset: 20,
      distinct: true,
    });
    // Ensure the mocked data was returned correctly
    expect(result).toEqual({
      media: [
        { id: 1, type: 'book', title: 'Title 1', description: 'Desc 1', publishedDate: '2023-01-01' },
        { id: 2, type: 'ebook', title: 'Title 2', description: 'Desc 2', publishedDate: '2023-01-02' },
      ],
      total: 50,
    });
  })

  
});
