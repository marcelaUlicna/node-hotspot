# node-hsp-simple
The small utility for creating a hotspot for wireless transferring data to another device.

### Settings
Run command `node hotspot.js -h` for help.

```
Usage: node hotspot.js option [arguments]

Option:
   -h    show help
   -e    enable hotspot
   -d    disable hotspot
   -s    hotspot status
   -v    show hotspot name and password

Arguments for -e option:
   --n   (optional) hotspot name
   --psw         (optional) hotspot password
```


### Creating new hotspot
Create new hotspot with default name and password (parameter -e)

`node hotspot.js -e`

  **output**
 ```
Configuring hotspot with SSID: hotspot name
Starting hotspot
Hotspot started!
ICS Configuration successful!
Hotspot enabled

Action:
```

Create new hotspot with given name and password (parameters -e --n "Hotspot name" --psw hotspot_password)

`node hotspot.js -e --n "My Wifi" --psw testPsw01`

Display hotspot's name and password (parameter -v)

`Action: -v`

**output**
```
Hotspot name: My Wifi
Password: testPsw01
```

Once a hotspot is successfully created, it is present amoung the available Wi-Fi networks on every device which supports Wi-Fi connection. Use a password for connecting to new Wi-Fi network. In case you do not use it anymore, it is recommendable to close connection by using parameter `-d`. After appearing the message `Hotspot disable`, connection was successfully terminated.

