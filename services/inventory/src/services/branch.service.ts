import Branch from '../models/Branch';

//Business Logic Layer

export class BranchService {
  public async getBranches() {
    return await Branch.findAll();
  }}