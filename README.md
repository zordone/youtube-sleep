# youtube-sleep

Small script to make YouTube go to sleep after a given time.

Starts a countdown timer on the top right corner of the video. First, it's barely visible, but it will turn into a red, blinking warning in the last 30 seconds. If you don't touch your keyboard or mouse, then in the last 15 seconds, the screen will slowly fade to black, the volume will fade out, and finally, the video will stop.

It works in normal, theater, and fullscreen mode as well. The timer remains active even if you start watching another video, or auto-playing a playlist.

There is nothing YouTube specific in the code, so it would probably work on other video sites as well, although this was not tested.

## How does it work

The main script is hosted in [this github repo](https://github.com/zordone/youtube-sleep).

You need to add a bookmarklet with a small starter script to load and run the main script on demand. A bookmarklet is just a bookmark, that runs code. The reason for this is to:

- Keep the bookmarklet small.
- Make it easy for you to change the default timeout.
- Receive future improvements in the main script without the need to update your bookmarklet.

If you have concerns about running someone else's code on your YouTube, you are free to review the [main script](https://github.com/zordone/youtube-sleep/blob/master/youtube-sleep.js), or even fork the repository and change the URL in the bookmarklet to your own.

## Setup

1. This is the starter script below. Copy it to the clipboard. [What is this sorcery?](#explanation)
   ```
   javascript:(async%20function()%7Bif(window.youtubeSleep)%7ByoutubeSleep(0)%3ByoutubeSleep%3Dnull%7Delse%7Bconst%20script%3Ddocument.createElement(%22script%22)%3Bscript.text%3D(await(await%20fetch(%22https%3A%2F%2Fraw.githubusercontent.com%2Fzordone%2Fyoutube-sleep%2Fmaster%2Fyoutube-sleep.js%22)).text())%2B%22youtubeSleep(10)%22%3Bdocument.body.appendChild(script)%3B%7D%7D)()
   ```
1. Create a new bookmark in your browser, and paste this text into the "URL" field, or "Address" in some browsers.
1. The default timeout is 10 minutes. If you want to change this, just find `youtubeSleep(10)` in the text and replace the `10` in it.

## Usage

When you're watchig YouTube from bed, and you want to make sure the video will stop after you fall asleep, just click the bookmark and the counter will start.

Click on the bookmark again to stop it.

## Screenshots

![Timeout started](https://github.com/zordone/youtube-sleep/raw/master/screenshots/01-timeout-started.png)
![Timeout warning](https://github.com/zordone/youtube-sleep/raw/master/screenshots/02-timeout-warning.png)
![Sleeping](https://github.com/zordone/youtube-sleep/raw/master/screenshots/03-sleep.png)

## Explanation

The bookmarklet URL is just the minified and URL encoded version of the starter script below. It just loads the main script and starts it with a 10 minutes timeout. Or if it's already running, stops it.

```javascript
if (window.youtubeSleep) {
  youtubeSleep(0);
  youtubeSleep = null;
} else {
  const script = document.createElement("script");
  script.text =
    (await (
      await fetch(
        "https://raw.githubusercontent.com/zordone/youtube-sleep/master/youtube-sleep.js"
      )
    ).text()) + "youtubeSleep(10)";
  document.body.appendChild(script);
}
```

## That's it

Good night!
