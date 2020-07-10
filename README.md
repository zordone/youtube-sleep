# youtube-sleep

Code snippet to sleep YouTube after a given time period.

Starts a countdown timer on the top right corner of the video. First it's barely visible, but it will turn into a red, blinking warning in the last 30 seconds. If you don't touch your keyboard or mouse before the time runs out, the screen will fade to black, the volume will slowly decrease to zero, and the video will stop.

## Setup

1. Open Chrome developer tools.
1. Go to the Source tab.
1. Open the sidebar.
1. Select the Snippets tab. It might be hidden behind the `>>` button.
1. Click on `New Snippet`, give it a name like "YouTube Sleep"
1. Paste the code below into the source window. You can replace the `10` in the code with the number of minutes you want YouTube to go to sleep. Don't forget to save the snippet.

```javascript
fetch(
  "https://raw.githubusercontent.com/zordone/youtube-sleep/master/youtube-sleep.js"
)
  .then((res) => res.text())
  .then((code) => {
    const script = document.createElement("script");
    script.text = `
      ${code}
      youtubeSleep(10);
    `;
    document.body.appendChild(script);
  })
  .catch(console.error);
```

## Usage

When you start watchig YouTube from bed, and you want to make sure the video stops after you fall asleep:

1. Open Chrome developer tools.
1. Press `command` + `P`.
1. Start typing `!YouTubeSleep` (or whatever name you gave to the snippet) and press `enter`.
1. Close the developer tools.

If you want to stop it:

1. Open Chrome developer tools.
1. Go to the console.
1. Type `youtubeSleep(0)` and press `enter`.
1. Close the developer tools.

## That's it

Good night!
