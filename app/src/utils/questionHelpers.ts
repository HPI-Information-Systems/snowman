import { Primitive } from 'snowman-library';
import { removeNaN } from 'utils/removeNaN';

export const parseIntRemoveNaN = (
  inputValue: Primitive | null
): number | undefined => {
  if (typeof inputValue === 'string') {
    inputValue = parseInt(inputValue);
  }
  return typeof inputValue === 'number' ? removeNaN(inputValue) : undefined;
};

export const parseFloatRemoveNaN = (
  inputValue: Primitive | null
): number | undefined => {
  if (typeof inputValue === 'string') {
    inputValue = parseFloat(inputValue);
  }
  return typeof inputValue === 'number' ? removeNaN(inputValue) : undefined;
};
