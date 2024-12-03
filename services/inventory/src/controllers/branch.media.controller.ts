import {Request, Response} from 'express';
import {BranchMediaService} from "../services/branch.media.service";

// The Controller class is responsible for handling requests to the endpoint.
// Any business logic should be delegated to the Service class.

export class BranchMediaController {
    private branchMediaService: BranchMediaService;

    constructor() {
        this.branchMediaService = new BranchMediaService();
    }

    public async getBranchMedia(req: Request, res: Response) {
        try{
            const stocks = await this.branchMediaService.getBranchMedia();
            res.json(stocks);
        }
        catch(error: any){
            res.status(error.statusCode || 500).json({ message: error.message });
        }
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

    public async updateStock(req: Request, res: Response) {
        try {
          const { MediaId } = req.body;
          const branchId = Number(req.params.branchId);
    
          if (!MediaId) {
            
             res.status(400).json({ message: 'Invalid request payload' });
             return
          }
    
          const updatedStock = await this.branchMediaService.updateStock(branchId, MediaId);
    
          if (!updatedStock) {
             res.status(404).json({ message: 'Stock not found' });
             return
          }
    
          res.status(200).json(updatedStock);
        } catch (error: any) {
          res.status(error.statusCode || 500).json({ message: error.message });
        }
      }
}
