import 'dotenv/config';
import cors from 'cors';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import connectDB from '../config/database';
import Routes from './routes';
import { PORT } from './config';

const app = express();

connectDB();
app.set('port', PORT);
app.use(
  cors({
    origin: '*'
  })
);
app.use((req, res, next) => {
  const allowedOrigins = ["https://kai-app-finance.vercel.app", "http://localhost:3000"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  return next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', Routes);

app.get('*', (req: express.Request, res: express.Response) => {
  res.sendFile(
    path.join(__dirname, '../build/index.html')
  ); //dist
});

const http = require('http').createServer(app);
http.listen(PORT);
console.log('server listening on:', PORT);
