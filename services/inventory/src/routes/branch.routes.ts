import { Router } from 'express';
import { BranchController } from '../controllers/branch.controller';

export class BranchRoutes {
  public router: Router;
  private branchController: BranchController;

  constructor() {
    this.router = Router();
    this.branchController = new BranchController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.branchController.getBranches.bind(this.branchController));
    this.router.get('/city/:id', this.branchController.getBranchesInCity.bind(this.branchController));
  }
}
