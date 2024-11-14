import City from '../models/City';

//Business Logic Layer

export class CityService {
  public async getCities() {
    return await City.findAll();
  }}