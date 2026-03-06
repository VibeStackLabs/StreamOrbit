import { useState } from "react";

export default function ChannelSkipper({
  onSkipDeadChannels,
  onTestSingleChannel,
  isTesting,
}) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="channel-skipper">
      <button
        className="skipper-toggle"
        onClick={() => setShowOptions(!showOptions)}
        title="Channel Tester"
      >
        🩺 {isTesting ? "Testing..." : "Test Channels"}
      </button>

      {showOptions && (
        <div className="skipper-options">
          <button
            onClick={() => {
              onSkipDeadChannels();
              setShowOptions(false);
            }}
            disabled={isTesting}
          >
            🔍 Scan & Skip Dead Channels
          </button>

          <button
            onClick={() => {
              onTestSingleChannel();
              setShowOptions(false);
            }}
            disabled={isTesting}
          >
            📡 Test Current Channel
          </button>

          <small>This will test each channel (may take a while)</small>
        </div>
      )}
    </div>
  );
}
