# Introduction

Welcome to the Snowman Data Matching Benchmark - this guide aims to help you get started!

## Setup

1. Download the latest artifact for you platform from the [Github Releases](https://github.com/HPI-Information-Systems/snowman/releases) page.

2. Extract the zip somewhere safe (e.g. your Documents folder) and run `snowman.exe`, `snowman.app` or `snowman` according to the platform you are on.

3. The benchmark will now start and ask you whether you want to spin up a local instance or connect to a remote.

The benchmark software is completely self-contained within the extracted directory (or .app file on macOS). Upgrading
is as easy as to download and use the newer version. Necessary migration steps will be applied to the stored data upon
the first start. See the following section on where data is persisted.

### Local usage

If you select local usage, a folder will be created within your home directory which houses our data store. This exact location of this folder is platform specific.

| Platform | Folder                                              |
| -------- | --------------------------------------------------- |
| macOS    | ~/Library/Application Support/snowman-wrapper       |
| Windows  | C:\\Users\\<you\>\\AppData\\Local\\snowman-wrapper |
| Linux    | ~/.config/snowman-wrapper                           |

If you changed something about your environment, these paths may be different. Rest assured that Snowman will not touch any other folders or files :)

### Remote usage

If you received a link to a colleagues instance, enter the link into the shown input field. The app will now attempt to connect to this URL and if unsuccessful show an error message. Connection issues can have a lot of causes - as a first debug step, attempt to open the URL within your browser!

## Concepts

As a first step, we suggest for you to get familiar with two of our main concepts - matching solutions and workflows.
