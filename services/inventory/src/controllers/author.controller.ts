import { Request, Response } from 'express';
import { AuthorService } from '../services/author.service';

// The Controller class is responsible for handling requests to the endpoint.
// Any business logic should be delegated to the Service class.

export class AuthorController {
  private authorService: AuthorService;

  constructor() {
    this.authorService = new AuthorService();
  }

  public async getAuthors(req: Request, res: Response) {
    try {
      const authors = await this.authorService.getAuthors();
      res.json(authors);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}
