export const indexToRC = (index: number) => {
    return { r: Math.floor(index / 5), c: index % 5 };   //Converts a 1D index (0–24) in a 5x5 grid to row r and column c
  };
export const isPrime = (n: number): boolean => {
    if (n < 2) return false;           
    for (let i = 2; i * i <= n; i++) {
      if (n % i === 0) return false;    //Checks if a number is prime
    }
    return true;                     
};
const randomLevelCells: Map<number, Set<number>> = new Map();
export const getRule = (level: number) => {
    switch (level) {
      case 1:
        return (index: number) => index % 2 === 0;
      case 2:
        return (index: number) => {
          const { r, c } = indexToRC(index);
          return r === c || r + c === 4;
        };
      case 3:
        return (index: number) => isPrime(index);
      case 4:
        return (index: number) => {
          return [12, 7, 11, 13, 17].includes(index);
        };
      case 5:
        return (index: number) => {
          const { r, c } = indexToRC(index);
          return (r + c) % 3 === 0;
        };
      case 6:
        return (index: number) => {
          const { r, c } = indexToRC(index);
          return r === 0 || r === 4 || c === 0 || c === 4;
        };
      case 7:
        return (index: number) => {
          if (!randomLevelCells.has(level)) {
            const randomSet = new Set<number>();
            const count = 6 + Math.floor(Math.random() * 3);  // Random number of active cells 6, 7, or 8
            while (randomSet.size < count) {                //Generate unique random indices until we reach the required count
              const randIndex = Math.floor(Math.random() * 25);
              randomSet.add(randIndex);
            }
            randomLevelCells.set(level, randomSet);
          }
          return randomLevelCells.get(level)!.has(index);
        };

      default:
        return () => false;
    }
  };