import express from 'express';
import {
  getAveragePrice,
  getStockCorrelation
} from '../controllers/stockController.js';

const router = express.Router();

router.get('/stockcorrelation', getStockCorrelation); 
router.get('/:ticker', getAveragePrice);

export default router;
