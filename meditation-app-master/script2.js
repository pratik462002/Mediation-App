const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");

  const sounds = document.querySelectorAll(".sounds-select");

  const sound1 = document.querySelector(".sound1");
  const sound2 = document.querySelector(".sound2");
  const sound3 = document.querySelector(".sound3");

  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");

  let fakeDuration = 600;

  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
      song.currentTime = 0;
    });
  });

  sound1.addEventListener("click", function () {
    song.src = this.getAttribute("data-sound");
  });
  sound2.addEventListener("click", function () {
    song.src = this.getAttribute("data-sound");
  });
  sound3.addEventListener("click", function () {
    song.src = this.getAttribute("data-sound");
  });
  play.addEventListener("click", () => {
    chcekplaying(song);
  });

  const chcekplaying = (song) => {
    if (song.paused) {
      song.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      play.src = "./svg/play.svg";
    }
  };

  const outlinelength = outline.getTotalLength();
  outline.style.strokeDasharray = outlinelength;
  outline.style.strokeDashoffset = outlinelength;

  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elaspedTime = fakeDuration - currentTime;

    let seconds = Math.floor(elaspedTime % 60);
    let minutes = Math.floor(elaspedTime / 60);

    let progress = outlinelength - (currentTime / fakeDuration) * outlinelength;

    outline.style.strokeDashoffset = progress;

    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
    }
  };
};
app();
