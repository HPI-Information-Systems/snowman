# Remote Instances

A Snowman instance can be hosted to allow remote access.
This can be useful in case you want to collaborate with coworkers or provide an instance for a client to connect to. We refer to such instances as *remote instances*.

!!! warning
    **Be advised: We have not yet implemented any security features or authorization.** That means every process with access to the host is able to access the API. Progress is tracked in issue [#107](https://github.com/HPI-Information-Systems/snowman/issues/107). We therefore recommend to all users to set up authentication and encryption for their remote instances by themselfs. This can be achieved through reverse proxies like [Caddy](https://caddyserver.com/) or [nginx](https://nginx.org/en/).

## How it Works

Snowman is a web server and web app packaged with Electron.
That means accessing a remote instance is as easy as visiting the website of the remote instance (this can be done with the Snowman client or a normal web browser).
By using this setup we avoid version conflicts as a client will always use the frontend provided by the remote instance.

## Client Perspective

As a client, you will receive the URL (=address) of the Snowman instance you
should connect to. When opening Snowman app, make sure to *not* start a local
instance but selecting *REMOTE INSTANCE* and entering the provided address.

## Provider Perspective

As a provider, you have two options for hosting a Snowman instance.

### Headless Mode

Snowman offers a headless mode (does not open a GUI window). Access it by including the `--headless` flag when starting snowman from the command line. For further command line arguments and how to configure host and port see [here](../dev_setup/introduction.md#command-line-arguments).

*Example:*  
`./snowman --headless --hostname 192.168.12.34 --port 8123 --storageDirectory /home/user/snowman`  
In this case, the address `http://192.168.12.34:8123` can be used by clients to connect to this instance.

### Docker

As an alternative, we provide a fully featured Docker image that runs a Snowman server.

`coming soon`
