import {Request, Response} from 'express';
import {TransferService} from "../services/transfer.service";

// The Controller class is responsible for handling requests to the endpoint.
// Any business logic should be delegated to the Service class.

export class TransferController {
    private transferService: TransferService;

    constructor() {
        this.transferService = new TransferService();
    }

    public async transfer(req: Request, res: Response) {
        try{
            const { branchOne, branchTwo, mediaId, quantity, transfer } = req.body;

            if (!branchOne || !branchTwo  || !mediaId || !quantity || !transfer) {
                return res.status(400).json({ message: 'Invalid transfer body' });
            }

            const data = await this.transferService.transfer(branchOne, branchTwo, mediaId, quantity, transfer);
            res.json(data);
        }
        catch(error: any){
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
}
