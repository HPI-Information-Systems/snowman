export const trimMathExpr = (aLatexString: string): string => {
  return aLatexString
    .replace(new RegExp(/^\$/), '')
    .replace(new RegExp(/\$$/), '');
};
