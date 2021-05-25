# Rest!sh CLI

The [restish project](https://rest.sh/#/guide) is a general purpose api client for the command line.
Snowman's API is completely compatible with restish.

## Getting started

As a first step, follow the restish's [getting started guide](https://rest.sh/#/guide) to install a recent version of
the software.

Afterwards, start your local snowman instance - by default, its API will then be available at `http://localhost:8123`.

Run the following command for an overview:

```bash
restish localhost:8123 --help
```

Now, (almost) every api functionality can be accessed easily:

```bash
restish localhost:8123 <function> -q <parameter>
```

## More information

See [restish docs](https://rest.sh/#/guide) for more information and complex operations.
