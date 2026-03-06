// hooks/useKeyboardNav.js
import { useEffect } from "react";

export default function useKeyboardNav({
  onNext,
  onPrev,
  onToggleFav,
  onOpenNavigator,
  onPlayPause,
  onVolumeUp,
  onVolumeDown,
}) {
  useEffect(() => {
    function handleKeyDown(e) {
      // Don't trigger if user is typing in an input
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
      }

      switch (e.key) {
        // Channel navigation
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          onNext?.();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          onPrev?.();
          break;

        // Quick actions
        case "f":
        case "F":
          e.preventDefault();
          onToggleFav?.();
          break;

        // Open channel guide
        case "g":
        case "G":
          e.preventDefault();
          onOpenNavigator?.();
          break;

        // Play/Pause
        case " ":
          e.preventDefault();
          onPlayPause?.();
          break;

        // Volume
        case "+":
        case "=":
          e.preventDefault();
          onVolumeUp?.();
          break;
        case "-":
        case "_":
          e.preventDefault();
          onVolumeDown?.();
          break;

        // Exit fullscreen
        case "Escape":
          if (document.fullscreenElement) {
            document.exitFullscreen();
          }
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    onNext,
    onPrev,
    onToggleFav,
    onOpenNavigator,
    onPlayPause,
    onVolumeUp,
    onVolumeDown,
  ]);
}
