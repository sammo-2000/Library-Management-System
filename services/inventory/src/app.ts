import cors from "cors";
import express, { Application } from "express";
import { AuthorRoutes } from "./routes/author.routes";
import { BranchMediaRoutes } from "./routes/branch.media.routes";
import { BranchRoutes } from "./routes/branch.routes";
import { CityRoutes } from "./routes/city.routes";
import { GenreRoutes } from "./routes/genre.routes";
import { MediaRoutes } from "./routes/media.routes";
import { PublisherRoutes } from "./routes/publisher.routes";
import { TransferRoutes } from "./routes/transfer.routes";

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
    this.app.use("/api/inventory/media", mediaRoutes.router);

    const authorRoutes = new AuthorRoutes();
    this.app.use("/api/inventory/authors", authorRoutes.router);

    const publisherRoutes = new PublisherRoutes();
    this.app.use("/api/inventory/publishers", publisherRoutes.router);

    const genreRoutes = new GenreRoutes();
    this.app.use("/api/inventory/genres", genreRoutes.router);

    const branchRoutes = new BranchRoutes();
    this.app.use("/api/inventory/branches", branchRoutes.router);

    const cityRoutes = new CityRoutes();
    this.app.use("/api/inventory/cities", cityRoutes.router);

    const stockRoutes = new BranchMediaRoutes();
    this.app.use("/api/inventory/stocks", stockRoutes.router);

    const transferRoutes = new TransferRoutes();
    this.app.use("/api/inventory/transfer", transferRoutes.router);

    this.app.use((req, res) => {
      res.status(404).send("Not found");
    });
  }
}

export default App;
