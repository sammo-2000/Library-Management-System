import Genre from '../models/Genre';

//Business Logic Layer

export class GenreService {
  public async getGenres() {
    return await Genre.findAll();
  }}