import { Router } from 'express';

export abstract class Routes {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  // Subclasses should call this method explicitly after setting up their controller
  public init(): void {
    this.initializeRoutes();
  }

  // Each subclass must implement this method
  protected abstract initializeRoutes(): void;
}
