import {Routes} from './routes';
import {BranchMediaController} from "../controllers/branch.media.controller";

export class BranchMediaRoutes extends Routes {
    private stockController: BranchMediaController;

    constructor() {
        super();
        this.stockController = new BranchMediaController();
        this.init();
    }

    protected initializeRoutes() {
        this.router.get('/', this.stockController.getBranchMedia.bind(this.stockController))
        this.router.get('/:branchId', this.stockController.getBranchMediaByBranchId.bind(this.stockController));
        this.router.patch('/update/:branchId', this.stockController.updateStock.bind(this.stockController));
    }
}