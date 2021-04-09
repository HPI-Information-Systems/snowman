function getNumberOfColumns(file: string[][]) {
  const numColumns = file[0].length;
  file.forEach((row) => {
    if (row.length !== numColumns) {
      throw new Error('file has rows of different length');
    }
  });
  return numColumns;
}

function rowsSorter(row1: string[], row2: string[]) {
  for (let index = 0; index < row1.length; index++) {
    if (row1[index] < row2[index]) {
      return -1;
    } else if (row1[index] > row2[index]) {
      return 1;
    }
  }
  return 0;
}

export function assertFilesMatch(file1: string[][], file2: string[][]): void {
  if (file1.length !== file2.length) {
    throw new Error('Length of files does not match');
  }
  if (getNumberOfColumns(file1) !== getNumberOfColumns(file2)) {
    throw new Error('Number of columns of files does not match.');
  }
  const remapFile2Columns = file2[0].map((column) => {
    return file1[0].indexOf(column);
  });
  if (remapFile2Columns.includes(-1)) {
    throw new Error('Columns of files do not match.');
  }
  file2 = file2.map((row) => {
    const result: string[] = new Array(row.length);
    remapFile2Columns.forEach((file1Index, file2Index) => {
      result[file1Index] = row[file2Index];
    });
    return result;
  });
  expect(file1.slice(1).sort(rowsSorter)).toMatchObject(
    file2.slice(1).sort(rowsSorter)
  );
}
