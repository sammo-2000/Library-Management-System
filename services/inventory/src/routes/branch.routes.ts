import { BranchController } from '../controllers/branch.controller';
import { Routes } from './routes';

export class BranchRoutes extends Routes {
  private branchController: BranchController;

  constructor() {
    super();
    this.branchController = new BranchController();
    this.init();
  }

  protected initializeRoutes() {
    this.router.get('/', this.branchController.getBranches.bind(this.branchController));
    this.router.get('/city/:id', this.branchController.getBranchesInCity.bind(this.branchController));
  }
}
