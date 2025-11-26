import { BranchService } from '../services/branch.service';
import Branch from '../models/Branch';
import { BadRequestError, NotFoundError } from '../errors';
import { jest } from '@jest/globals';

jest.mock('../models/Branch', () => ({
  findAll: jest.fn(() => Promise.resolve([
  {
    id: 1,
    name: "Hallam",
    City: {
      id: 1,
      city: "Sheffield"
    }
  },
  {
    id: 2,
    name: "Central Library",
    City: {
      id: 1,
      city: "Sheffield"
    }
  }],)),
  findByPk: jest.fn((id) => {
    // Simulate finding a record by primary key
    const mockData = [
  {
    id: 1,
    name: "Hallam",
    City: {
      id: 1,
      city: "Sheffield"
    }
  },
  {
    id: 2,
    name: "Central Library",
    City: {
      id: 1,
      city: "Sheffield"
    }
  }];
    return Promise.resolve(mockData.find((item) => item.id === id) || null);
  }),
})); // Mock the Branch model

describe('BranchService - getBranchById', () => {
    const branchService = new BranchService();
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    test('should throw BadRequestError if branchId is not a number', async () => {
        const branchId = 'invalid';
        await expect(branchService.getBranchById(branchId)).rejects.toThrow(BadRequestError);
    });
    
    test('should return a branch by ID', async () => {
        const branchId = '1';
        const result = await branchService.getBranchById(branchId);
    
        expect(Branch.findByPk).toHaveBeenCalled();
        expect(Branch.findByPk).toHaveBeenCalledWith(1, {
        include: ['City'],
        attributes: { exclude: ['cityId'] }
        });
        expect(result).toEqual({
        id: 1,
        name: "Hallam",
        City: {
            id: 1,
            city: "Sheffield"
        }
        });
    });
    
    test('should throw NotFoundError if branch is not found', async () => {
        const branchId = '3';
        await expect(branchService.getBranchById(branchId)).rejects.toThrow(NotFoundError);
    });
});

describe('BranchService - getBranchesInCity', () => {
    const branchService = new BranchService();
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    test('should throw BadRequestError if cityId is not a number', async () => {
        const cityId = 'invalid';
        await expect(branchService.getBranchesInCity(cityId)).rejects.toThrow(BadRequestError);
    });
    
    test('should return branches in a city', async () => {
        const cityId = '1';
        const result = await branchService.getBranchesInCity(cityId);
    
        expect(Branch.findAll).toHaveBeenCalled();
        expect(Branch.findAll).toHaveBeenCalledWith({
        where: { cityId: 1 },
        attributes: { exclude: ['cityId'] }
        });
        expect(result).toEqual([
        {
            id: 1,
            name: "Hallam",
            City: {
            id: 1,
            city: "Sheffield"
            }
        },
        {
            id: 2,
            name: "Central Library",
            City: {
            id: 1,
            city: "Sheffield"
            }
        }
        ]);
    });
});