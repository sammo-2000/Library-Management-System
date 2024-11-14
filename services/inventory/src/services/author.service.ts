import Author from '../models/Author';

//Business Logic Layer

export class AuthorService {
  public async getAuthors() {
    return await Author.findAll();
  }}