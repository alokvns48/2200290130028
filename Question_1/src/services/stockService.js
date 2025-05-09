import axios from 'axios';
import { BASE_API_URL } from '../configs/constants.js';
import { calculateAverage } from '../utils/averageUtils.js';
import { calculateCorrelation } from '../utils/correlationUtils.js';
import cache from '../utils/stockCache.js';

const headers = {
  Authorization: `Bearer ${process.env.BEARER_TOKEN}`
};

// Function to get stock history and calculate average price
export async function getStockHistoryWithAverage(ticker, minutes) {
  const cacheKey = `${ticker}_${minutes}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  const response = await axios.get(`${BASE_API_URL}/stocks/${ticker}?minutes=${minutes}`, { headers });
  const priceHistory = response.data;

  const averageStockPrice = calculateAverage(priceHistory.map(p => p.price));

  const result = { averageStockPrice, priceHistory };
  cache.set(cacheKey, result);
  return result;
}

// Function to get stock correlation
export async function getCorrelation(ticker1, ticker2, minutes) {
  const [history1, history2] = await Promise.all([
    getStockHistoryWithAverage(ticker1, minutes),
    getStockHistoryWithAverage(ticker2, minutes)
  ]);

  const correlation = calculateCorrelation(history1.priceHistory, history2.priceHistory);
  

  return {
    correlation,
    stocks: {
      [ticker1]: history1,
      [ticker2]: history2
    }
  };
}
