let cachedScrollbarWidth: number | undefined = undefined;

export const scrollbarWidth = (): number => {
  // taken from https://davidwalsh.name/detect-scrollbar-width
  const scrollDiv = document.createElement('div');
  if (cachedScrollbarWidth === undefined) {
    scrollDiv.setAttribute(
      'style',
      `width: 100px;
      height: 100px;
      overflow: scroll;
      position:absolute;
      top:-9999px;`
    );
    document.body.appendChild(scrollDiv);
    cachedScrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
  }
  return cachedScrollbarWidth;
};
