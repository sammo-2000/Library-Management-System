import { Request, Response } from 'express';
import { CityService } from '../services/city.service';

// The Controller class is responsible for handling requests to the endpoint.
// Any business logic should be delegated to the Service class.

export class CityController {
  private cityService: CityService;

  constructor() {
    this.cityService = new CityService();
  }

  public async getCities(req: Request, res: Response) {
    try{
      const cities = await this.cityService.getCities();
      res.json(cities);
    }
    catch(error: any){
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}
