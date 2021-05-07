const colors = [
  '#ff1744',
  '#1de9b6',
  '#ffc400',
  '#d500f9',
  '#00e676',
  '#651fff',
  '#ff9100',
  '#00b0ff',
  '#76ff03',
];

let currentId = Math.floor(Math.random() * colors.length);

export const getNextColor = (): string => {
  if (currentId >= colors.length) currentId = 0;
  return colors[currentId++];
};
