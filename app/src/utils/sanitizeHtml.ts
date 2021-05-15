// Will use the web browser's sanitizing powers
export const sanitize = (htmlString: string): string => {
  const tmp = document.createElement('div');
  tmp.textContent = htmlString;
  return tmp.innerHTML;
};
