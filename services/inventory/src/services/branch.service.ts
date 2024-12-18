import { BadRequestError, NotFoundError } from '../errors';
import Branch from '../models/Branch';

//Business Logic Layer

export class BranchService {
  public async getBranchById(rawBranchId: string) {
    const branchId = parseInt(rawBranchId, 10);
    if (isNaN(branchId)) {
      throw new BadRequestError('Branch ID should be a number');
    }
    const branch = await Branch.findByPk(branchId, {
      include: ['City'],
      attributes: { exclude: ['cityId'] }
    });
    if (!branch) {
      throw new NotFoundError('Branch not found');
    }
    return branch;
  }

  public async getBranches() {
    return await Branch.findAll({
      include: ['City'],
      attributes: { exclude: ['cityId'] }
    });
  }

  public async getBranchesInCity(rawCityId: string) {
    const cityId = parseInt(rawCityId, 10);
    if (isNaN(cityId)) {
      throw new BadRequestError('City ID should be a number');
    }
    return await Branch.findAll({
      where: { cityId },
      attributes: { exclude: ['cityId'] }
    });
  }
}