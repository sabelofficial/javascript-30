//get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggleButton = player.querySelector('.toggle'); // play/pause button
const sliders = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('button[data-skip]');
const fullscreen = player.querySelector('.fullscreen');

const toggleVideo = () => {
    video.paused ? video.play() : video.pause();
}

const updateButton = () => {
    const icon = video.paused ? '►' : '❚ ❚';
    toggleButton.innerText = icon; //innerText vs innerHTML vs textContent 
}

const updateSlider = ({ target }) => {
    video[target.name] = target.value; //use bracket notation to access the property of a JS object
}

const skipVideo = ({ target }) => {
    video.currentTime += parseFloat(target.dataset.skip);
}

const updateTime = e => {
    const newTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = newTime;
}

const updateProgressBar = () => {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

const enterFullscreen = () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) { //Firefox
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) { //Chrome, Safari
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { //Edge, IE
        video.msRequestFullscreen();
    }
}

const ESC_KEYCODE = 27;
const exitFullscreen = (e) => {
    if(e.keyCode === ESC_KEYCODE) {
        if (video.exitFullscreen) {
            video.exitFullscreen();
        } else if (video.mozCancelFullScreen) { 
            video.mozCancelFullScreen();
        } else if (video.webkitExitFullscreen) { 
            video.webkitExitFullscreen();
        } else if (video.msExitFullscreen) { 
            video.msExitFullscreen();
        }
    }
}

//event listeners
toggleButton.addEventListener('click', toggleVideo);

//video
video.addEventListener('click',toggleVideo);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

//sliders
sliders.forEach(slide => {
    slide.addEventListener('input', updateSlider);
    slide.addEventListener('change', updateSlider); //fallback function for IE10 and above
}); 
//Note: oninput is not support in IE10 and above

//skip buttons
skipButtons.forEach(skip => skip.addEventListener('click', skipVideo)); 

//progress
let mouseDown = false;
progress.addEventListener('click', updateTime);
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
progress.addEventListener('mousemove', (e) => mouseDown && updateTime(e));
// ^ allows user to 'drag' along the progress bar to go through the video

//progress bar
video.addEventListener('timeupdate', updateProgressBar);

//fullscreen
fullscreen.addEventListener('click', enterFullscreen);
window.addEventListener('keydown', exitFullscreen) //use ESC key to exit fullscreen