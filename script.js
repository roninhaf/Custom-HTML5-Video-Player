"use strict";

/* Constants that hold our elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenButton = player.querySelector('.fullscreen');

/* Our functions */
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
    if (this.name === 'playbackRate') {
        document.getElementById('speedLabel').innerHTML = `Speed:${this.value}x`;
    }
}

function scrub(event) {
    const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = percent+'%';
}

let full = false;

function toggleFullscreen() {
    
    full?
    
        (function() {
            full = false;
            if (document.exitFullscreen) {
            document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }})()
        
        : 
        
        (function() {
            full = true;
            if (player.requestFullscreen) {
            player.requestFullscreen();
            } else if (player.mozRequestFullScreen) { // Firefox 
            player.mozRequestFullScreen();
            } else if (player.webkitRequestFullscreen) { // Chrome, Safari and Opera 
            player.webkitRequestFullscreen();
            } else if (player.msRequestFullscreen) { // IE/Edge 
            player.msRequestFullscreen();
        }})();

    }

/* Hooks up our event listeners */
toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(element => {
    element.addEventListener('click', skip);
});

ranges.forEach(element => {
    element.addEventListener('change', handleRangeUpdate);
})

progress.addEventListener('click', scrub);
let mousedown = false;
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (event) => mousedown && scrub(event));

fullscreenButton.addEventListener('click', toggleFullscreen);