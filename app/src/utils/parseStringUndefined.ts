export const parseStringUndefined = (
  value: string | null | undefined
): string | null | undefined => (value === 'undefined' ? undefined : value);
