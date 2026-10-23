(() => {
  const video = document.querySelector('.sw7-catering-hero video');
  if (!video) return;

  video.muted = true;
  video.defaultMuted = true;
  const playback = video.play();
  if (playback && typeof playback.catch === 'function') {
    playback.catch(error => {
      // Allow a visitor to start playback when their browser requires a gesture.
      if (error.name === 'NotAllowedError' && video.paused) {
        video.controls = true;
      }
    });
  }
})();
