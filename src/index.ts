import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import cors from 'cors';
import api from './routes';

require('dotenv').config();

process.env.TZ = 'America/Guayaquil'; // zona horaria de la app

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.set('view engine', 'ejs');

// public files
app.use(express.static('public'));

mongoose.set('useCreateIndex', true);

const PORT = process.env.PORT || 7000;

setTimeout(() => {
  mongoose
    .connect(process.env.MONGO!, {
      useNewUrlParser: true
    })
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Listening on ${PORT}`);
      });
    })
    .catch((e) => {
      console.error(`error to trying connected to mongodb ${e}`);
    });
}, 5000);

api(app);
