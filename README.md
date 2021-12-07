# MMM-DailyAlarm
MagicMirror module for daily countdown to sunset clock

## Features
- Showing time until local sunset
- Custom CSS for each event.
- At 00AM of each day, events will be refreshed.

## Installation
```
cd ~/MagicMirror/modules
git clone https://github.com/powerjc/MMM-SunsetCountdown/
```

## Configuration Example
```
{
  module: "MMM-DailyAlarm",
  position:"top_right",
  config: {
    event: "Sunset in:",
    postevent: "See you tomorrow",
    fetchInterval: 60*1000, //in ms 60000 = 1 minute
    userlat: "0",
    userlon: "0",
  }
},
```
