/**
 * CRA Post Build
 * Preloads all the chunks found in the "assets-manifest.json"
 * Source: https://github.com/facebook/create-react-app/issues/5306#issuecomment-570764571
 */

const fs = require('fs');
const builtHTMLContent = fs.readFileSync('./build/index.html').toString();
const manifest = JSON.parse(
  fs.readFileSync('./build/asset-manifest.json').toString()
);

const preload = Object.values(manifest.files)
  .filter(($) => {
    // skip known patterns
    if ($.includes('.svg')) return false;
    if ($.includes('.chunk.js.map')) return false;
    if ($.includes('.chunk.js.LICENSE')) return false;
    if ($.includes('.chunk.css.map')) return false;

    // skip entry points
    const isEntry = manifest.entrypoints.some((_) => $.includes(_));
    if (isEntry) return false;

    // skip non-chunks
    if (!$.includes('.chunk.js') && !$.includes('.chunk.css')) return false;

    return true;
  })
  .map(($) =>
    $.includes('.js')
      ? `<link rel="preload" as="script" href="${$}" />`
      : `<link rel="preload" as="stylesheet" href="${$} />`
  )
  .join('');

const lazyPreload = `
<script>
window.__preloadChunks__ = () => {
  const preload = document.createElement('span');
  preload.innerHTML = '${preload}';
  document.body.appendChild(preload);
};
setTimeout(window.__preloadChunks__, 50);
</script>`;

fs.writeFileSync(
  './build/index.html',
  builtHTMLContent.replace('</body>', `${lazyPreload}</body>`)
);
