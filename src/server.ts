// import 'dotenv/config';
import App from './app';
import PitController from './pit/pitController';

const app = new App(
  [
    new PitController(),
  ],
);

app.listen();
