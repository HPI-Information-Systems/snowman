# Remote instances

Snowman allows one to connect to an instance hosted somewhere else.
This can be useful in case you want to collaborate with coworkers or
prepare an instance for a client to connect to.

!!! warning
    **Authorization is not yet implemented.** Progress is tracked in issue
    [#107](https://github.com/HPI-Information-Systems/snowman/issues/107)!

## How it works

The windows a normal Snowman user interacts with is basically a normal web
browser that serves a webapp. Therefore, it is as easy as pointing this
web view's target url to a remote instance in order to access it.  
Thereby, a client will always use the frontend provided by the instance he
connects to no matter what version of Snowman he is using locally on his own
computer.

## Client perspective

As a client, you will receive the URL (=address) of the Snowman instance you
should connect to. When opening Snowman app, make sure to *not* start a local
instance but rather connect to a remote instance by entering the provided address.

## Provider perspective

As a provider, you've got two options for running a Snowman server.

### Headless mode

GUI windows are quite unusual for server applications and Snowman therefore offers to run
completely without one - we call it `headless mode`.

Running in `headless mode` will give you access to additional configuration properties like `headless`, `hostname`,
`port` and the `storageDirectory`. It is important to configure these correctly!

To get an overview of all available flags, run `./snowman --help`. The following will describe the most important ones:

- `--headless`: Include this flag to disable opening a GUI window.
- `--hostname`: This is the host that Snowman will bind to. The default is `127.0.0.1` (=localhost) and will therefore
restrict access to local host users.
- `--port`: For accessing the server, you must provide the listening port. By default, Snowman is available at
http://localhost:8123 since the port is set to 8123.
- `--storageDirectory`: Out of the box, Snowman will store its files to a system specific folder in your home
directory. To overwrite this behaviour and better control the data, feel free to supply a path yourself.
  
*Example:*  
`./snowman --headless --hostname 192.168.12.34 --port 8123 --storageDirectory /home/user/snowman`  
In this case, you'd supply the address `http://192.168.12.34:8123` to the client.

### Docker

As an alternative, we provide a fully featured Docker image that runs a Snowman server.

`coming soon`

## Security

At the moment, the API is not using any authorization to protect its contents. It is therefore recommended
to set up additional authentication (and encryption) through a reverse proxy like
[Caddy](https://caddyserver.com/) or [nginx](https://nginx.org/en/).