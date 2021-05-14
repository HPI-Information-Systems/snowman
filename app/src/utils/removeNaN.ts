export const removeNaN = (value?: number): number | undefined => {
  return value === 0 ? 0 : value || undefined;
};
