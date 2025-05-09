export function calculateAverage(prices) {
    if (!prices.length) return 0;
    const sum = prices.reduce((acc, p) => acc + p, 0);
    return sum / prices.length;
  }
  