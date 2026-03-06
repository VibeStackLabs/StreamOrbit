import { useState } from "react";

export default function PlaylistSource({ onSourceChange }) {
  const [showCustom, setShowCustom] = useState(false);
  const [customUrl, setCustomUrl] = useState("");

  const countries = [
    { code: "in", name: "India" },
    { code: "us", name: "USA" },
    { code: "uk", name: "UK" },
    { code: "ca", name: "Canada" },
    { code: "au", name: "Australia" },
    { code: "de", name: "Germany" },
    { code: "fr", name: "France" },
    { code: "es", name: "Spain" },
    { code: "it", name: "Italy" },
    { code: "br", name: "Brazil" },
  ];

  function handleCountryChange(e) {
    const country = e.target.value;
    if (country) {
      onSourceChange(
        "country",
        `https://iptv-org.github.io/iptv/countries/${country}.m3u`,
      );
    }
  }

  function handleCustomUrl() {
    if (customUrl) {
      onSourceChange("custom", customUrl);
      setCustomUrl("");
      setShowCustom(false);
    }
  }

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onSourceChange("file", event.target.result, file.name);
      };
      reader.readAsText(file);
    }
  }

  return (
    <div className="playlist-source">
      <div className="source-section">
        <label>Select Country:</label>
        <select onChange={handleCountryChange} defaultValue="">
          <option value="" disabled>
            Choose a country
          </option>
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="source-section">
        <button onClick={() => setShowCustom(!showCustom)}>
          {showCustom ? "Cancel" : "Add Custom URL"}
        </button>

        {showCustom && (
          <div className="custom-url-input">
            <input
              type="url"
              placeholder="https://example.com/playlist.m3u"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
            />
            <button onClick={handleCustomUrl}>Load</button>
          </div>
        )}
      </div>

      <div className="source-section">
        <label>Upload M3U File:</label>
        <input
          type="file"
          accept=".m3u,.m3u8,text/plain"
          onChange={handleFileUpload}
        />
      </div>
    </div>
  );
}
