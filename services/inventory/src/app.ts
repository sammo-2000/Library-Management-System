import express, {Application} from 'express';
import {MediaRoutes} from './routes/media.routes';
import {AuthorRoutes} from './routes/author.routes';
import {GenreRoutes} from './routes/genre.routes';
import {BranchRoutes} from './routes/branch.routes';
import {CityRoutes} from './routes/city.routes';
import {PublisherRoutes} from './routes/publisher.routes';
import cors from 'cors';
import {BranchMediaRoutes} from "./routes/branch.media.routes";
import {TransferRoutes} from "./routes/transfer.routes";

class App {
  public app: Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private initializeRoutes() {
    const mediaRoutes = new MediaRoutes();
    this.app.use('/api/media', mediaRoutes.router);

    const authorRoutes = new AuthorRoutes();
    this.app.use('/api/authors', authorRoutes.router);

    const publisherRoutes = new PublisherRoutes();
    this.app.use('/api/publishers', publisherRoutes.router);

    const genreRoutes = new GenreRoutes();
    this.app.use('/api/genres', genreRoutes.router);

    const branchRoutes = new BranchRoutes();
    this.app.use('/api/branches', branchRoutes.router);

    const cityRoutes = new CityRoutes();
    this.app.use('/api/cities', cityRoutes.router);

    const stockRoutes = new BranchMediaRoutes();
    this.app.use('/api/stocks', stockRoutes.router);

    const transferRoutes = new TransferRoutes();
    this.app.use('/api/transfers', transferRoutes.router);

    this.app.use((req, res) => {
      res.status(404).send('Not found');
    });
  }
}

export default App;
