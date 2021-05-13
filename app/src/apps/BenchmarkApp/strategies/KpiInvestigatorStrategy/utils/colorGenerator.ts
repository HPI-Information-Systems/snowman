const colors = [
  'rgb(29,233,182)',
  'rgb(255,196,0)',
  'rgb(213,0,249)',
  'rgb(255,23,68)',
  'rgb(0,230,118)',
  'rgb(101,31,255)',
  'rgb(255,145,0)',
  'rgb(0,176,255)',
  'rgb(118,255,3)',
];

let currentId = 0;

export const getNextColor = (): string => {
  if (currentId >= colors.length) currentId = 0;
  return colors[currentId++];
};

export const getMyColor = (id: number, alpha?: number): string => {
  return alpha !== undefined
    ? changeColorAlpha(colors[id % colors.length], alpha)
    : colors[id % colors.length];
};

const changeColorAlpha = (aColor: string, amount: number): string => {
  if (amount > 1 || amount < 0) return aColor;
  return aColor
    .replace('rgb(', 'rgba(')
    .replace(')', ',' + amount.toFixed(3) + ')');
};
