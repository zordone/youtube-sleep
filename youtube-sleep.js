(function () {
  const WARNING_SEC = 30;
  const FADEOUT_SEC = 20;

  let player, parent; // using these elements from youtube
  let display, cover, style; // creating these elements for ourselves
  let timeoutSec, timeLeft, timerId; // timekeeping
  let originalVolume;
  let inited = false;

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
      opacity: 0.3;
      transition: all 1s ease-in-out;
    }
    .youtube-sleep.start {
      font-size: 4rem;
      opacity: 1;
      transition: all 0.1s ease-in-out;
    }
    .youtube-sleep.warning {
      font-size: 4rem;
      color: red;
      opacity: 1;
      animation: youtube-sleep-blink 1s infinite;
    }
    @keyframes youtube-sleep-blink {
      0% { opacity: 0; }
      20% { opacity: 1; }
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
      background: #000000f0;
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

  const init = () => {
    // locate elements
    player = document.querySelector("video");
    parent = player.parentNode;
    originalVolume = player.volume;
    // add css
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
    document.addEventListener("mousemove", keepAwake, { passive: true });
    document.addEventListener("keydown", keepAwake, { passive: true });
    player.addEventListener("play", keepAwake, { passive: true });
    inited = true;
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

    display.classList.add("start");
    setTimeout(() => {
      display.classList.remove("start");
    }, 1000);

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
    return (...args) => {
      if (wait) {
        return;
      }
      func(...args);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, time);
    };
  };

  const stop = () => {
    if (!inited) {
      return;
    }
    clearInterval(timerId);
    display.classList.remove("warning");
    cover.style.opacity = 0;
    player.volume = originalVolume;
  };

  const keepAwake = throttle((event) => {
    // play event at time zero means a new video started, in which case we don't want to restart the timer
    const currentTime = event.target?.currentTime;
    if (currentTime === 0) {
      return;
    }
    // restart the timer
    stop();
    start();
  }, 5000);

  const deinit = () => {
    if (!inited) {
      return;
    }
    document.removeEventListener("mousemove", keepAwake);
    document.removeEventListener("keydown", keepAwake);
    player.removeEventListener("play", keepAwake);
    display.remove();
    cover.remove();
    style.remove();
    inited = false;
  };

  window.youtubeSleep = (timeoutMinutes = 10) => {
    stop();
    deinit();
    // falsy to deactivate
    if (!timeoutMinutes) {
      console.log("YouTubeSleep stopped.");
      return;
    }
    // otherwise start
    timeoutSec = timeoutMinutes * 60;
    init();
    start();
    console.log("YouTubeSleep started.");
    console.log(
      `Youtube will go to sleep after ${timeoutMinutes} minutes if you don't touch your keyboard or mouse.`
    );
  };

  console.log("YouTubeSleep loaded.");
})();
