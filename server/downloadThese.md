# Libraries Used:
- `ioredis`
- `redis-cli`
- `nodemon`
- `express`

# [How to Install Redis on Windows!](https://developer.redis.com/create/windows/)
## Step 1: Turn on Windows Subsystem for Linux

1. Open PowerShell as Administrator.
2. Run the following command:

    ```powershell
    Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
    ```

3. Reboot Windows after making the change.

## Step 2: Launch Microsoft Windows Store

1. Open Microsoft Windows Store by running:

    ```powershell
    start ms-windows-store:
    ```

2. Search for Ubuntu or your preferred Linux distribution.
3. Download and install the latest version.

## Step 3: Install Redis server

1. After initializing Ubuntu and creating a login, run the following commands:

    ```bash
    sudo apt-add-repository ppa:redislabs/redis
    sudo apt-get update
    sudo apt-get upgrade
    sudo apt-get install redis-server
    ```

    > **NOTE**: The `sudo` command may or may not be required based on your user configuration.

## Step 4: Restart the Redis server

To restart the Redis server, use:

```bash
sudo service redis-server restart
```
# Step 5: Verify if your Redis server is running
Test connectivity to your Redis database:
```bash
redis-cli
127.0.0.1:6379> set user:1 "Jane"
127.0.0.1:6379> get user:1
```
> NOTE: Redis by default has 0-15 indexes for databases. You can change the number of databases by editing the redis.conf file.

# Step 6: Stop the Redis Server
When you need to stop the Redis server, execute:
```bash
sudo service redis-server stop
```

>  When using this guide, replace `$` with `redis-cli` if you are running directly from the command line, and remove the `127.0.0.1:6379>` part which represents the Redis command prompt after starting `redis-cli`.