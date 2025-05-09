// Function to align two price histories based on timestamps
export function alignPriceData(history1, history2) {
    const aligned = [];
    const timeMap = new Map();
  
    history1.forEach(entry => {
      timeMap.set(entry.lastUpdatedAt, { price1: entry.price });
    });
  
    history2.forEach(entry => {
      if (timeMap.has(entry.lastUpdatedAt)) {
        aligned.push({
          timestamp: entry.lastUpdatedAt,
          price1: timeMap.get(entry.lastUpdatedAt).price1,
          price2: entry.price
        });
      } else {
        const closestTime = getClosestTimestamp(timeMap, entry.lastUpdatedAt);
        if (closestTime) {
          aligned.push({
            timestamp: closestTime,
            price1: timeMap.get(closestTime).price1,
            price2: entry.price
          });
        }
      }
    });
  
    return aligned;
  }

  // Function to find the closest timestamp in a Map
  export function getClosestTimestamp(timeMap, timestamp) {
    let closestTime = null;
    let closestDiff = Infinity;
  
    const targetTime = new Date(timestamp).getTime();
  
    timeMap.forEach((value, key) => {
      const diff = Math.abs(new Date(key).getTime() - targetTime);
      if (diff < closestDiff) {
        closestDiff = diff;
        closestTime = key;
      }
    });
  
    return closestTime;
  }
  
  // Function to calculate mean
  export function calculateMean(prices) {
    return prices.reduce((sum, price) => sum + price, 0) / prices.length;
  }
  
  // Function to calculate covariance
  export function calculateCovariance(prices1, prices2, mean1, mean2) {
    const sum = prices1.reduce((acc, price1, i) => {
      const price2 = prices2[i];
      return acc + (price1 - mean1) * (price2 - mean2);
    }, 0);
    return sum / prices1.length;
  }
  
  // Function to calculate standard deviation
  export function calculateStandardDeviation(prices, mean) {
    const sumSquaredDiff = prices.reduce((acc, price) => {
      return acc + Math.pow(price - mean, 2);
    }, 0);
    return Math.sqrt(sumSquaredDiff / prices.length);
  }
  
  // Function to calculate correlation
  export function calculateCorrelation(stock1History, stock2History) {
    if (!Array.isArray(stock1History) || !Array.isArray(stock2History)) {
      throw new Error('Invalid price history data');
    }
    
    console.log('Stock 1 History:', stock1History);
    console.log('Stock 2 History:', stock2History);

    const alignedPrices = alignPriceData(stock1History, stock2History);

    console.log(alignedPrices);
    
    if (alignedPrices.length < 2) {
      throw new Error('Insufficient data points for correlation calculation');
    }
  
    const prices1 = alignedPrices.map(p => p.price1);
    const prices2 = alignedPrices.map(p => p.price2);
  
    const mean1 = calculateMean(prices1);
    const mean2 = calculateMean(prices2);
  
    const covariance = calculateCovariance(prices1, prices2, mean1, mean2);
    const stdDev1 = calculateStandardDeviation(prices1, mean1);
    const stdDev2 = calculateStandardDeviation(prices2, mean2);
  
    return covariance / (stdDev1 * stdDev2);
  }
  