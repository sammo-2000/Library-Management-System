import {Request, Response} from 'express';
import {BranchMediaService} from "../services/branch.media.service";

// The Controller class is responsible for handling requests to the endpoint.
// Any business logic should be delegated to the Service class.

export class BranchMediaController {
    private branchMediaService: BranchMediaService;

    constructor() {
        this.branchMediaService = new BranchMediaService();
    }


    public async getBranchMediaByBranchId(req: Request, res: Response) {
        try{
            const stocks = await this.branchMediaService.getBranchMediaByBranchId(Number(req.params.branchId));
            res.json(stocks);
        }
        catch(error: any){
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
}
