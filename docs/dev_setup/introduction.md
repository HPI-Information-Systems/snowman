# Development setup

## Folder structure

The benchmark is split into three separate packages:

1. `./`: integration tests and linters for Typescript and CSS
2. `./app`: our React frontend
3. `./wrapper`: our backend + electron to wrap everything up and build a single binary

## Installation

1. install [NodeJS](https://nodejs.org/en/) version `14.x` or later
2. install a C++ compiler and add it to your PATH
   - the easiest way to accomplish this on Windows is installing the [VisualStudio BuildTools for C++](https://visualstudio.microsoft.com/de/downloads/) (+ reboot)
3. install [Python3](https://www.python.org/) for your distribution
4. Run `npm install` in `./`, `./app` and `./wrapper`

Python3 and C++ are required to build the native extensions for sqlite3.

## Running

### Manual

- run `npm start-api` in `./wrapper` to start the backend
- run `npm start` in `./app` to start the frontend and open a browser

If you want to start the electron wrapper:

- run `npm run release-app` in `./` to build and copy the app to `./wrapper`
- run `npm run erebuild` in `./wrapper` to recompile the dependencies to the NodeJS version of electron
- run `npm run start` in `./wrapper` to
- run `npm run rebuild` in `./wrapper` to recompile the dependencies back to the global NodeJS version

### VSCode

Run the `Start Stack` compound to start frontend and backend and open Chrome. You can now use breakpoints in `./app` and `./wrapper/api`.

## Building

- run `npm run release` in `./` to build the frontend and backend and package them in an executable file
  - the executable will be located at `./wrapper/build/<platform>/`
- run `npm rebuild` in `./wrapper`
  - during the build process the dependencies are rebuilded for the NodeJS version of electron
  - this reverts that process and makes sure starting the backend still works

## Testing

- run `npm run lint` or `npm run lint-fix` in `./` to lint the project
- run `npm run test` in `./` (integration tests), `./app` (frontend tests) and `./wrapper` (backend tests) to test the project

## Backend API

The backend API can also be reached directly. Have a look at our [REST API specification](../swagger/index.html) for details.

## Command Line Arguments

The backend supports the following command line arguments:

- `--storageDirectory path/to/directory`: Where the database and configuration files live
  - default if starting via `npm run start-api`: `.../wrapper/storage`
  - default if starting via `npm run start` or executable: electrons [`userData`](https://www.electronjs.org/docs/all#appgetapppath) folder
- `--inMemory`: If present, an in memory database will be used. This increases the performance. Keep in mind that any changes made will be lost when the process is stopped.
  - default: not present
- `--hostname example.org`: The API will be available on this hostname only.
  - default: `localhost`
- `--port 12345`: The API will be available on this port.
  - default: `8123`
- `--headless`: If present, does not show the UI but starts the API directly.
  - default: not present

Those arguments can be passed to

- `npm run start` and `npm run start-api` in `./wrapper` (*do not forget to use `--` to separate the `npm` command and the arguments*)
- the [built executable file](#building)
