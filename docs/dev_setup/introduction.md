# Development setup

> This page is not finished yet! Please get in touch in case you want to start developing :)

The project is split into 3 (or 4) individual components which need special care.

> **Attention:** You'll need a working C++ compiler installed and added to your PATH variable. The easiest way to accomplish this is installing the VisualStudio BuildTools for C++ (incl. a reboot).

## Folder structure

To ease development, the benchmark is split into three separate packages. See the following details for more information.

### ./

This folder includes the global linter for Typescript and CSS. Install the dependencies with `npm install`.

You may now execute `npm run lint` or `npm run lint-fix` - or any other script defined in `package.json` :)

`npm start` will build and run everything combined :)

### ./app

Our React frontend is contained in this folder. Open a terminal within it and run `npm install` as well.

### ./wrapper

To wrap everything and build a single binary, electron is used. This also includes the backend which consists of a Node Express server. `npm install` installs the dependencies :)

## Backend API

The backend can also be reached directly. See our guide "REST API" for details.