export const fuzzyStringIncludes = (
  sourceString: string,
  searchString: string
): boolean =>
  sourceString.toLocaleLowerCase().includes(searchString.toLocaleLowerCase());
