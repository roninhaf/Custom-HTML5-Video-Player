const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenButton = player.querySelector('.fullscreen');

function togglePlay() {
    video[video.paused?'play':'pause']();
}

function updateButton() {
    toggle.textContent = this.paused?'►':'❚ ❚';
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function scrub(a) {
    const scrubTime = (a.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = percent+'%';
}

function toggleFullscreen() {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) { /* Firefox */
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE/Edge */
      video.msRequestFullscreen();
    }
  }

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
skipButtons.forEach(element => {
    element.addEventListener('click', skip);
});
ranges.forEach(a => {
    a.addEventListener('change', handleRangeUpdate);
})
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', scrub);
let mousedown = false;
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (a) => mousedown && scrub(a));
fullscreenButton.addEventListener('click', toggleFullscreen);


