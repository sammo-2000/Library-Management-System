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
  findByPk: jest.fn((id) => {
    // Simulate finding a record by primary key
    const mockData = [
      { id: 1, type: 'book', title: 'Title 1', description: 'Desc 1', publishedDate: '2023-01-01' },
      { id: 2, type: 'ebook', title: 'Title 2', description: 'Desc 2', publishedDate: '2023-01-02' },
    ];
    return Promise.resolve(mockData.find((item) => item.id === id) || null);
  }),
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

  test('should expect offset of 0 for page 1', async () => {
    // Call the method in your service
    const mediaService = new MediaService();
    const query = { page: '1' };

    const result = await mediaService.getAllMedia(query);

    // Assertions
    expect(Media.findAndCountAll).toHaveBeenCalled(); // Ensure it was called
    expect(Media.findAndCountAll).toHaveBeenCalledWith({
      where: {}, // Example: depends on the query logic
      include: expect.any(Array),
      attributes: ['id', 'type', 'title', 'description', 'publishedDate'],
      limit: 20,
      offset: 0,
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

  test('should expect offset to change based on page', async () => {
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

  describe('MediaService - getMediaById', () => {
    const mediaService = new MediaService();

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should throw BadRequestError if id is not a number', async () => {
      const id = 'invalid';
      await expect(mediaService.getMediaById(id)).rejects.toThrow(BadRequestError);
    })

    test('should return media by id', async () => {
      const id = '1';
      const result = await mediaService.getMediaById(id);

      // Assertions
      expect(Media.findByPk).toHaveBeenCalled(); // Ensure it was called
      const mediaId = parseInt(id, 10);
      expect(Media.findByPk).toHaveBeenCalledWith(mediaId, {
        attributes: ['id', 'type', 'title', 'description', 'publishedDate'],
        include: expect.any(Array),
      });
      // Ensure the mocked data was returned correctly
      expect(result).toEqual({ id: 1, type: 'book', title: 'Title 1', description: 'Desc 1', publishedDate: '2023-01-01' });
    });
  });
});
