import { useState, useEffect } from "react";

export default function PWAUpdate() {
  const [showUpdate, setShowUpdate] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    // Check for service worker updates
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              setShowUpdate(true);
            }
          });
        });
      });
    }

    // Handle online/offline status
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleUpdate = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.waiting?.postMessage({ type: "SKIP_WAITING" });
        setShowUpdate(false);
        window.location.reload();
      });
    }
  };

  if (!showUpdate && !isOffline) return null;

  return (
    <>
      {showUpdate && (
        <div className="pwa-update-banner">
          <p>✨ New version available!</p>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setShowUpdate(false)}>Later</button>
        </div>
      )}
      {isOffline && (
        <div className="pwa-offline-banner">
          📡 You're offline - using cached channels
        </div>
      )}
    </>
  );
}
