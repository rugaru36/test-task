const express = require('express');
const bodyParser = require('body-parser');
const paymentController = require('./controllers/PaymentController');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config({ path: '../.env' });

const PORT = Number(process.env.PORT) || 3000;

const app = express();
app.listen(PORT, () => { console.log(`listening to port ${PORT}!`); });
app.use(bodyParser.json());
app.use(cors());

// --------------------- get ---------------------
app.get('/payment/all', paymentController.getPaymentAll);

// --------------------- post --------------------
app.post('/payment/create', paymentController.postPaymentCreate);
