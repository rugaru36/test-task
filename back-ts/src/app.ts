import express, { Express } from 'express';
import bodyParser from 'body-parser';
import * as paymentController from './controllers/PaymentController';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config({ path: '../.env' });


const PORT = Number(process.env.PORT) || 3000;

const app: Express = express();
app.listen(PORT, () => { console.log(`listening to port ${PORT}!`); });
app.use(bodyParser.json());
app.use(cors());

// --------------------- get ---------------------
app.get('/payment/all', paymentController.getPaymentAll);

// --------------------- post --------------------
app.post('/payment/create', paymentController.postPaymentCreate);
