import {Routes} from './routes';
import {TransferController} from "../controllers/transfer.controller";

export class TransferRoutes extends Routes{
    private transferController: TransferController;

    constructor() {
        super();
        this.transferController = new TransferController();
        this.init();
    }

    protected initializeRoutes() {
        this.router.post('/', this.transferController.transfer.bind(this.transferController));
    }
}
