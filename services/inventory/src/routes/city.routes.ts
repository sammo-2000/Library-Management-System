import { CityController } from '../controllers/city.controller';
import { Routes } from './routes';

export class CityRoutes extends Routes{
  private cityController: CityController;

  constructor() {
    super();
    this.cityController = new CityController();
    this.init();
  }

  protected initializeRoutes() {
    this.router.get('/', this.cityController.getCities.bind(this.cityController));
  }
}
