# Getting Started

At the end of this document you will have a working version of Snowman.

## Setup

1. Download the latest artifact for you platform from the [Github Releases](https://github.com/HPI-Information-Systems/snowman/releases) page.

2. Extract the zip and run `snowman.exe`, `snowman.app` or `snowman` according to the platform you are on.

3. The benchmark will now start and ask you whether you want to spin up a local instance or connect to a remote instance.

   - *Note: The initial startup of Snowman can take some time.*

### Local usage

If you select local usage, a folder within your home directory is created.
This folder contains all benchmark data.
The location of this folder is platform specific.

| Platform | Folder                                          |
| -------- | ----------------------------------------------- |
| MacOS    | `~/Library/Application Support/snowman-wrapper` |
| Windows  | `C:\Users\<you>\AppData\Local\snowman-wrapper`  |
| Linux    | `~/.config/snowman-wrapper`                     |

If you changed something in your environment, these paths may be different. Rest assured that Snowman will not touch any other folders or files :)

### Remote usage

If you received a link to a colleagues instance, enter the link into the input field.
The app will now connect to this URL and log into your colleagues instance.
If the remote instance cannot be reached, an error message is shown. As a first debug step, attempt to open the URL within your browser.

## Upgrading from a previous version

To upgrade Snowman to the latest version, first delete the folder with the old version of Snowman. This step is not necessary but should be done because running an old version of Snowman after running the newest version **will reset all data**.
Afterwards, simply follow the steps in [Setup](#setup) again.
Necessary migration steps will automatically be applied to the stored data.

## Next Step

You now should have a working version of Snowman.
As a next step we suggest for you to get familiar with the key concepts and terminology used throughout Snowman.
