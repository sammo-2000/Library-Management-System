import { BadRequestError } from '../errors';
import Branch from '../models/Branch';

//Business Logic Layer

export class BranchService {
  public async getBranchById(branchId: number) {
    const branch = await Branch.findByPk(branchId, {
      include: ['City'],
      attributes: { exclude: ['cityId'] }
    });
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