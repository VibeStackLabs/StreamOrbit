import { useEffect } from "react";

export default function useKeyboardNav({ onNext, onPrev, onToggleFav }) {
  useEffect(() => {
    function handleKeyDown(e) {
      // Don't trigger if user is typing in an input
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
      }

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          onNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          onPrev();
          break;
        case "f":
        case "F":
          e.preventDefault();
          onToggleFav();
          break;
        case " ":
          e.preventDefault();
          togglePlayPause();
          break;
        case "Escape":
          e.preventDefault();
          exitFullscreen();
          break;
      }
    }

    function togglePlayPause() {
      const player = document.querySelector(".video-js");
      if (player) {
        const videoPlayer = videojs.getPlayer(player.id);
        if (videoPlayer) {
          if (videoPlayer.paused()) {
            videoPlayer.play();
          } else {
            videoPlayer.pause();
          }
        }
      }
    }

    function exitFullscreen() {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev, onToggleFav]);
}
