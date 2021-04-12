export function findClosingBracket(
  expression: string,
  openIndex: number
): number {
  let bracketCount = 1;
  let closeIndex = openIndex;
  while (bracketCount > 0 && ++closeIndex < expression.length) {
    if (expression[closeIndex] === '(') {
      bracketCount++;
    } else if (expression[closeIndex] === ')') {
      bracketCount--;
    }
  }
  return closeIndex;
}
