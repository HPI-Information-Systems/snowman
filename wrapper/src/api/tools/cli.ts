import * as dashdash from 'dashdash';
import path from 'path';

interface CommandLineArguments extends dashdash.Results {
  storageDirectory: string;
  inMemory: boolean;
  hostname: string;
  port: number;
  headless: boolean;
}

export const STORAGE_DIRECTORY_CLI_FLAG = 'storageDirectory';

dashdash.addOptionType({
  name: 'port',
  takesArg: true,
  helpArg: '<port>',
  parseArg: (_option, _optstr, arg) => {
    const port = parseInt(arg);
    if (port < 1 || port > 65535) {
      throw new Error(
        `port needs to be in the range from 1 to 65535 (received ${arg})`
      );
    }
    return port;
  },
});

export const cliOptions: dashdash.OptionWithoutAliases[] = [
  {
    name: STORAGE_DIRECTORY_CLI_FLAG,
    type: 'string',
    default: path.join(__dirname, '../../../storage'),
    help: 'Where the database and configuration files live.',
  },
  {
    name: 'inMemory',
    type: 'bool',
    default: (false as unknown) as string,
    help:
      'If present, an in memory database will be used. This increases the performance. Keep in mind that any changes made will be lost when the process is stopped.',
  },
  {
    name: 'hostname',
    type: 'string',
    default: 'localhost',
    help: 'The API will be available on this hostname only.',
  },
  {
    name: 'port',
    type: 'port',
    default: (8123 as unknown) as string,
    help: 'The API will be available on this port.',
  },
  {
    name: 'headless',
    type: 'bool',
    default: (false as unknown) as string,
    help: 'If present, does not show the UI but starts the API directly.',
  },
];

export const cliArgs = dashdash.parse({
  options: cliOptions,
}) as CommandLineArguments;
