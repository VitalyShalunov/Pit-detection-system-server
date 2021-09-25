// import * as bodyParser from 'body-parser';
var bodyParser = require('body-parser')
var cors = require('cors')
var fileUpload = require('express-fileupload')
import * as express from 'express';
import * as mongoose from 'mongoose';
import Controller from './interfaces/controllerInterface';
import errorMiddleware from './middleware/errorMiddleware';

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    const port = 8000;
    this.app.listen(port, () => {
      console.log(`App listening on the port ${port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser({limit: '50mb'})); //Now deprecated
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    this.app.use(fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
    }));
    this.app.use(cors());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private connectToTheDatabase() {
    mongoose.connect(`mongodb://localhost:27017`);
  }
}

export default App;
