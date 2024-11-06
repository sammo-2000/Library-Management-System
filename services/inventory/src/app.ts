import express, { Application } from 'express';
import { MediaRoutes } from './routes/media.routes';

class App {
  public app: Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
  }

  private initializeRoutes() {
    //TODO: Initialize routes here
    const mediaRoutes = new MediaRoutes();
    this.app.use('/api/media', mediaRoutes.router);
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default App;
