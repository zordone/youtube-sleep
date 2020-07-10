# youtube-sleep

Code snippet to make YouTube go to sleep after a given time period.

Starts a countdown timer on the top right corner of the video. First it's barely visible, but it will turn into a red, blinking warning in the last 30 seconds. If you don't touch your keyboard or mouse, then in the last 15 seconds, the screen will start to slowly fade to black, the volume will decrease to zero, and the video will stop.

It works in normal, theater and fullscreen mode as well. The timer remains active even if you start watching another video.

There is nothing really YouTube specific in the code, so it should probably work on other video sites as well, although this was not tested.

## How does it work

The main code is hosted in [this github repo](https://github.com/zordone/youtube-sleep). You need to add a small code snippet to your Chrome to load and run it on demand. The reason for this is to:

- Keep the snippet small.
- Make it easy for you to change the timeout.
- Receive future bugfixes without the need to update your snippet.

If you have concerns about running someone else's code in your YouTube, you are free to fork the repository and change the URL in the snippet to your own.

## Setup

1. Open Chrome developer tools.
1. Go to the Source tab.
1. Open the left sidebar.
1. Select the Snippets tab. It might be hidden behind the `>>` button.
1. Click on `New Snippet`, give it a name like "YouTube Sleep"
1. Paste the code below into the source ediitor. You can replace the `10` in the code with the number of minutes after you want YouTube to go to sleep. Don't forget to save the snippet.

```javascript
fetch(
  "https://raw.githubusercontent.com/zordone/youtube-sleep/master/youtube-sleep.js"
)
  .then((res) => res.text())
  .then((code) => {
    const script = document.createElement("script");
    script.text = `
      ${code}
      youtubeSleep(10);  // <- change timeout here
    `;
    document.body.appendChild(script);
  })
  .catch(console.error);
```

## Usage

When you start watchig YouTube from bed, and you want to make sure the video stops after you fall asleep:

1. Open Chrome developer tools.
1. Press `command` + `P`.
1. Start typing `!YouTube Sleep` (or whatever name you gave to the snippet) and press `enter`. You only need to type the first couple characters until it filters down to one snippet.
1. Close the developer tools.

If you want to stop it for some reason, you can just reload the page. If you don't want to do that:

1. Open Chrome developer tools.
1. Go to the console.
1. Type `youtubeSleep(0)` and press `enter`.
1. Close the developer tools.

## Screenshots

![Timeout started](https://github.com/zordone/youtube-sleep/raw/master/screenshots/01-timeout-started.png)
![Timeout warning](https://github.com/zordone/youtube-sleep/raw/master/screenshots/02-timeout-warning.png)
![Sleeping](https://github.com/zordone/youtube-sleep/raw/master/screenshots/03-sleep.png)

## That's it

Good night!
