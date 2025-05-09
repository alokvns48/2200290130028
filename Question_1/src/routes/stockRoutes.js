import express from 'express';
import {
  getAveragePrice,
  getStockCorrelation
} from '../controllers/stockController.js';

const router = express.Router();

// Endpoint to get stock history and average price
router.get('/stockcorrelation', getStockCorrelation); 
// Endpoint to get stock correlation
router.get('/stocks/:ticker', getAveragePrice);

export default router;
