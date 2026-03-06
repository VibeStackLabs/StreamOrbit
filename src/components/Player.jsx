import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function Player({ stream }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!stream) return;

    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(stream);
      hls.attachMedia(video);
    } else {
      video.src = stream;
    }
  }, [stream]);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      style={{
        width: "100%",
        maxHeight: "500px",
        background: "black",
      }}
    />
  );
}
