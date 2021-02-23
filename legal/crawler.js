// eslint-disable-next-line @typescript-eslint/no-var-requires
const crawler = require('npm-license-crawler');

let options = {
  start: ['.'],
  json: 'docs/licenses.json',
};

crawler.dumpLicenses(options, function (error, res) {
  if (error) {
    console.error('Error:', error);
  } else {
    printLicenses(countLicenses(res));
  }
});

function countLicenses(pkgs) {
  let list = {};
  for (const pkg in pkgs) {
    const lcs = pkgs[pkg]['licenses'];
    if (lcs !== undefined) {
      if (list[lcs] === undefined) {
        list[lcs] = 0;
      }
      list[lcs] = list[lcs] + 1;
    }
  }
  return list;
}

function printLicenses(list) {
  const keysSorted = Object.keys(list).sort((a, b) => list[b] - list[a]);

  console.log('');
  console.log('x------------------------------------------------x');
  console.log('|  License Name                        |  Count  |');
  console.log('x------------------------------------------------x');

  for (let key of keysSorted) {
    const name = ('  ' + key + '                                   ').slice(
      0,
      38
    );
    const count = ('       ' + list[key] + '  ').slice(-9);
    console.log('|' + name + '|' + count + '|');
  }

  console.log('x------------------------------------------------x');
  console.log('');

  if (keysSorted.includes('UNKNOWN')) {
    console.log(
      'ATTENTION: You have',
      list['UNKNOWN'],
      'packages with unknown license status!'
    );
  } else {
    console.log('All licenses (probably) detected successfully!');
  }

  console.log('');
}
