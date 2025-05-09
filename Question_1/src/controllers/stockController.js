import {
    getStockHistoryWithAverage,
    getCorrelation
  } from '../services/stockService.js';
  
  export async function getAveragePrice(req, res) {
    try {
      const { ticker } = req.params;
      const minutes = parseInt(req.query.minutes);
  
      const result = await getStockHistoryWithAverage(ticker, minutes);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch average price' });
    }
  }
  
  export async function getStockCorrelation(req, res) {
    try {
      const { minutes, ticker } = req.query;
      const [ticker1, ticker2] = Array.isArray(ticker) ? ticker : [];
  
      if (!ticker1 || !ticker2) {
        return res.status(400).json({ error: 'Provide two tickers' });
      }
  
      const result = await getCorrelation(ticker1, ticker2, parseInt(minutes));
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to calculate correlation' });
    }
  }
  