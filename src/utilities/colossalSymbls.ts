export const parseClubbedSymbols = ({
  clubbedSymbols,
}: {
  clubbedSymbols: Array<string>;
}): Array<string> => {
  const parsedClubbedSymbols: Array<string> = [];
  if (clubbedSymbols && clubbedSymbols.length > 0) {
    clubbedSymbols.forEach((cSym: string) => {
      // cSym = "sym3_1x2"
      const strMatrixSize = cSym.split("_"); // ["sym3", "1x2"]
      const matrix = strMatrixSize[1].split("x"); // ["1","2"]
      const symCols = parseInt(matrix[0]);
      const symRows = parseInt(matrix[1]);
      for (let colIdx = 0; colIdx < symCols; colIdx++) {
        for (let rowIdx = 0; rowIdx < symRows; rowIdx++) {
          parsedClubbedSymbols.push(`${cSym}_${colIdx + 1}-${rowIdx + 1}`); // sym1_3x3_1-1
        }
      }
    });
  }
  return parsedClubbedSymbols;
};
