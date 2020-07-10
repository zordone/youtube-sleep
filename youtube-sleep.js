(function () {
  const WARNING_SEC = 30;
  const FADEOUT_SEC = 20;

  let player, parent; // using these from youtube
  let display, cover, style; // creating these for ourselves
  let timeoutSec, timeLeft, timerId; // timekeeping
  let originalVolume;

  const init = () => {
    // locate elements
    player = document.querySelector("video");
    parent = player.parentNode;
    originalVolume = player.volume;
    // add css
    const css = `
      .youtube-sleep {
        position: absolute;
        top: 1rem;
        right: 1rem;
        padding: 1rem;
        font-size: 3rem;
        font-weight: 900;
        background: transparent;
        color: white;  
        text-shadow: -0.2rem 0.2rem 0.2rem black;
        user-select: none;
        pointer-events: none;
        z-index: 1000;
        border-radius: 0.5rem;
        opacity: 0.2;
      }
      .youtube-sleep.warning {
        background: black;
        color: red;
        opacity: 1;
        animation: youtube-sleep-blink 1s infinite;
      }
      @keyframes youtube-sleep-blink {
        0% { opacity: 0; }
        20% { opacity: 1; }
        65% { opacity: 1; }
        70% { opacity: 0; }
        95% { opacity: 0; }
      }
      .youtube-sleep-cover {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        opacity: 0;
        pointer-events: none;
        background: #000000e6;
        z-index: 1001;
        transition: opacity 1s linear;
        font-size: 5rem;
        font-weight: 900;
        font-style: italic;
        color: #054cd080;
        text-align: center;
        line-height: 100vh;        
      }
    `;
    style = document.createElement("style");
    style.innerText = css;
    style.id = "youtube-sleep-style";
    document.head.appendChild(style);
    // add display span
    display = document.createElement("span");
    display.classList.add("youtube-sleep");
    parent.appendChild(display);
    // add cover div
    cover = document.createElement("div");
    cover.classList.add("youtube-sleep-cover");
    cover.innerText = "💤 Good night!";
    document.body.appendChild(cover);
    // keep awake events
    document.body.onmousemove = keepAwake;
    document.body.onkeydown = keepAwake;
  };

  const secsToTime = (secs) => {
    const min = Math.trunc(secs / 60);
    const sec = (secs - min * 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const start = () => {
    // stop previous timer
    clearInterval(timerId);
    // reset stuff
    timeLeft = timeoutSec;
    display.innerText = secsToTime(timeLeft);
    display.classList.remove("warning");
    // start new timer
    timerId = setInterval(() => {
      timeLeft -= 1;
      display.innerText = secsToTime(timeLeft);
      if (timeLeft === WARNING_SEC) {
        display.classList.add("warning");
        originalVolume = player.volume;
      }
      if (timeLeft <= FADEOUT_SEC) {
        const ratio = timeLeft / FADEOUT_SEC;
        cover.style.opacity = 1 - ratio;
        player.volume = originalVolume * ratio;
      }
      if (timeLeft === 0) {
        clearInterval(timerId);
        display.classList.remove("warning");
        player.pause();
        player.volume = originalVolume;
      }
    }, 1000);
  };

  const throttle = (func, time) => {
    let wait = false;
    return () => {
      if (wait) {
        return;
      }
      func();
      wait = true;
      setTimeout(() => {
        wait = false;
      }, time);
    };
  };

  const stop = () => {
    clearInterval(timerId);
    display.classList.remove("warning");
    cover.style.opacity = 0;
    player.volume = originalVolume;
  };

  const deactivate = () => {
    display.remove();
    cover.remove();
    style.remove();
    window.youtubeSleep = undefined;
  };

  const keepAwake = throttle(() => {
    stop();
    start();
  }, 5000);

  init();
  console.log("YoutubeSleep has been loaded.");
  console.log("Call it with the number of minutes:", "youtubeSleep(10)");
  console.log("Or with zero to deactivate it", "youtubeSleep(10)");

  window.youtubeSleep = (timeoutMinutes) => {
    // falsy to deactivate
    if (!timeoutMinutes) {
      stop();
      deactivate();
      console.log("YoutubeSleep stopped and deactivated.");
      return;
    }
    // otherwise start
    timeoutSec = timeoutMinutes * 60;
    start();
    console.log("YoutubeSleep started.");
    console.log(
      `Youtube will go to sleep after ${timeoutMinutes} minutes if you don't touch your keyboard or mouse.`
    );
  };
})();
