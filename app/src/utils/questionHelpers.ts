export const parseInputToNumberOrUndef = (
  inputValue: string | undefined | null
): number | undefined => {
  if (inputValue === undefined) return undefined;
  if (inputValue === null) return undefined;
  const parsed = parseInt(inputValue);
  return isNaN(parsed) ? undefined : parsed;
};
