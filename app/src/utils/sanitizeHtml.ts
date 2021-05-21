// Will use the web browser's sanitizing powers
export const sanitize = (
  htmlString: string | undefined
): string | undefined => {
  if (htmlString === undefined) return undefined;
  const tmp = document.createElement('div');
  tmp.textContent = htmlString;
  return tmp.innerHTML;
};
