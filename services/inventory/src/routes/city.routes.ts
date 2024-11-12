import { Router } from 'express';
import { CityController } from '../controllers/city.controller';

export class CityRoutes {
  public router: Router;
  private cityController: CityController;

  constructor() {
    this.router = Router();
    this.cityController = new CityController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.cityController.getCities.bind(this.cityController));
  }
}
