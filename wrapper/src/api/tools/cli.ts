import * as dashdash from 'dashdash';

interface IArgs {
  path?: string;
}

const cliOptions: dashdash.Option[] = [
  {
    name: 'path',
    type: 'string',
  },
];

function getArgs(): IArgs {
  try {
    return dashdash.parse({ options: cliOptions }) as IArgs;
  } catch (_) {
    return {} as IArgs;
  }
}

export const cliArgs = getArgs();
