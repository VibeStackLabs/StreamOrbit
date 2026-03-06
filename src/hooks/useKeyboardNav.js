import { useEffect } from "react";

export default function useKeyboardNav(onNext, onPrev) {
  useEffect(() => {
    function handler(e) {
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    }

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, []);
}
