/* eslint-disable */
function showLoader() {
  for (let loader of document.getElementsByClassName('btn-submit')) {
    // Source: https://loading.io/css/
    loader.innerHTML =
      '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
  }

  mui.overlay('on', {
    keyboard: false,
    static: true,
  });
}

function startLocalBenchmark() {
  showLoader();
  window.benchmark.startLocal();
}

function startRemoteBenchmark() {
  let urlField = document.getElementById('remote_url');
  if (urlField.checkValidity()) {
    showLoader();
    window.benchmark.startRemote(urlField.value);
  }
}

function resetLauncher() {
  window.benchmark.resetLauncher();
}
