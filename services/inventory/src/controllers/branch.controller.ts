import { Request, Response } from 'express';
import { BranchService } from '../services/branch.service';

// The Controller class is responsible for handling requests to the endpoint.
// Any business logic should be delegated to the Service class.

export class BranchController {
  private branchService: BranchService;

  constructor() {
    this.branchService = new BranchService();
  }

  public async getBranchById(req: Request, res: Response) {
    try {
      const branch = await this.branchService.getBranchById(parseInt(req.params.id));
      res.json(branch);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  public async getBranches(req: Request, res: Response) {
    try {
      const branches = await this.branchService.getBranches();
      res.json(branches);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  public async getBranchesInCity(req: Request, res: Response) {
    try {
      const branches = await this.branchService.getBranchesInCity(req.params.id);
      res.json(branches);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}
