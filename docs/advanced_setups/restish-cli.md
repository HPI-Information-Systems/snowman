# Rest!sh CLI

The [restish project](https://rest.sh/#/guide) is a general purpose api client for the command line.
To make accessing the data easier, Snowman's api is compatible with restish's interface.

## Getting started

As a first step, follow restish's [getting started guide](https://rest.sh/#/guide) to install a recent version of
the software.

Afterwards, start your local snowman instance - by default, its api will then be available at `http://localhost:8123`.

Run the following command to get a brief overview:

```bash
restish localhost:8123 --help
```

Now, (almost) every api functionality can be accessed as easily as:

```bash
restish localhost:8123 <function> -q <parameter>
```

## More information

See [restish docs](https://rest.sh/#/guide) for more information and complex operations.
