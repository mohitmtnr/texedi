//fullscreen for app
let fullScreenStatus = 0;
const ToggleFullScreen = () => {
  if (fullScreenStatus === 0) {
    const enterFullscreen = () => {
      fullScreenStatus = 1;
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        // Firefox
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        // Chrome, Safari, and Opera
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        // IE/Edge
        element.msRequestFullscreen();
      }
    };
    enterFullscreen();
  } else {
    const exitFullscreen = () => {
      fullScreenStatus = 0;
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari, and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }
    };
    exitFullscreen();
  }
};

export default ToggleFullScreen;
