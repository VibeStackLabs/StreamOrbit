import { useState } from "react";

export default function PlaylistSource({ onSourceChange }) {
  const [showCustom, setShowCustom] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [sourceType, setSourceType] = useState("country"); // country, category, language, region

  // Categories from the list
  const categories = [
    "animation",
    "auto",
    "business",
    "classic",
    "comedy",
    "cooking",
    "culture",
    "documentary",
    "education",
    "entertainment",
    "family",
    "general",
    "interactive",
    "kids",
    "legislative",
    "lifestyle",
    "movies",
    "music",
    "news",
    "outdoor",
    "public",
    "relax",
    "religious",
    "science",
    "series",
    "shop",
    "sports",
    "travel",
    "weather",
    "undefined",
  ];

  // Languages (abbreviated list - you can add more)
  const languages = [
    { code: "eng", name: "English" },
    { code: "hin", name: "Hindi" },
    { code: "spa", name: "Spanish" },
    { code: "fra", name: "French" },
    { code: "deu", name: "German" },
    { code: "ita", name: "Italian" },
    { code: "por", name: "Portuguese" },
    { code: "rus", name: "Russian" },
    { code: "ara", name: "Arabic" },
    { code: "ben", name: "Bengali" },
    { code: "tel", name: "Telugu" },
    { code: "tam", name: "Tamil" },
    { code: "kan", name: "Kannada" },
    { code: "mal", name: "Malayalam" },
    { code: "mar", name: "Marathi" },
    { code: "guj", name: "Gujarati" },
    { code: "pan", name: "Punjabi" },
    { code: "urd", name: "Urdu" },
    { code: "zho", name: "Chinese" },
    { code: "jpn", name: "Japanese" },
    { code: "kor", name: "Korean" },
    { code: "tur", name: "Turkish" },
    { code: "fas", name: "Persian" },
    { code: "tha", name: "Thai" },
    { code: "vie", name: "Vietnamese" },
    { code: "ind", name: "Indonesian" },
    { code: "msa", name: "Malay" },
  ];

  // Regions
  const regions = [
    { code: "afr", name: "Africa" },
    { code: "amer", name: "Americas" },
    { code: "arab", name: "Arab world" },
    { code: "asia", name: "Asia" },
    { code: "apac", name: "Asia-Pacific" },
    { code: "asean", name: "ASEAN" },
    { code: "balkan", name: "Balkan" },
    { code: "benelux", name: "Benelux" },
    { code: "carib", name: "Caribbean" },
    { code: "cenamer", name: "Central America" },
    { code: "cee", name: "Central and Eastern Europe" },
    { code: "cas", name: "Central Asia" },
    { code: "ceu", name: "Central Europe" },
    { code: "cis", name: "Commonwealth of Independent States" },
    { code: "eaf", name: "East Africa" },
    { code: "eas", name: "East Asia" },
    { code: "eur", name: "Europe" },
    { code: "emea", name: "Europe, Middle East and Africa" },
    { code: "eu", name: "European Union" },
    { code: "gcc", name: "Gulf Cooperation Council" },
    { code: "hispam", name: "Hispanic America" },
    { code: "latam", name: "Latin America" },
    { code: "lac", name: "Latin America and Caribbean" },
    { code: "maghreb", name: "Maghreb" },
    { code: "mideast", name: "Middle East" },
    { code: "mena", name: "Middle East and North Africa" },
    { code: "nord", name: "Nordics" },
    { code: "noram", name: "North America" },
    { code: "nam", name: "Northern America" },
    { code: "neu", name: "Northern Europe" },
    { code: "oce", name: "Oceania" },
    { code: "southam", name: "South America" },
    { code: "sas", name: "South Asia" },
    { code: "sea", name: "Southeast Asia" },
    { code: "saf", name: "Southern Africa" },
    { code: "ser", name: "Southern Europe" },
    { code: "ssa", name: "Sub-Saharan Africa" },
    { code: "un", name: "United Nations" },
    { code: "waf", name: "West Africa" },
    { code: "was", name: "West Asia" },
    { code: "wer", name: "Western Europe" },
    { code: "ww", name: "Worldwide" },
  ];

  // Countries (abbreviated list - you can add more)
  const countries = [
    { code: "in", name: "India" },
    { code: "us", name: "USA" },
    { code: "gb", name: "UK" },
    { code: "ca", name: "Canada" },
    { code: "au", name: "Australia" },
    { code: "de", name: "Germany" },
    { code: "fr", name: "France" },
    { code: "es", name: "Spain" },
    { code: "it", name: "Italy" },
    { code: "br", name: "Brazil" },
    { code: "jp", name: "Japan" },
    { code: "kr", name: "South Korea" },
    { code: "cn", name: "China" },
    { code: "ru", name: "Russia" },
    { code: "za", name: "South Africa" },
    { code: "ng", name: "Nigeria" },
    { code: "eg", name: "Egypt" },
    { code: "sa", name: "Saudi Arabia" },
    { code: "ae", name: "UAE" },
    { code: "il", name: "Israel" },
    { code: "tr", name: "Turkey" },
    { code: "pk", name: "Pakistan" },
    { code: "bd", name: "Bangladesh" },
    { code: "lk", name: "Sri Lanka" },
    { code: "np", name: "Nepal" },
    { code: "id", name: "Indonesia" },
    { code: "my", name: "Malaysia" },
    { code: "sg", name: "Singapore" },
    { code: "ph", name: "Philippines" },
    { code: "th", name: "Thailand" },
    { code: "vn", name: "Vietnam" },
    { code: "mx", name: "Mexico" },
    { code: "ar", name: "Argentina" },
    { code: "cl", name: "Chile" },
    { code: "co", name: "Colombia" },
    { code: "pe", name: "Peru" },
    { code: "ve", name: "Venezuela" },
    { code: "int", name: "International" },
    { code: "undefined", name: "Undefined" },
  ];

  function handleSourceTypeChange(e) {
    setSourceType(e.target.value);
  }

  function handleCategoryChange(e) {
    const category = e.target.value;
    if (category) {
      onSourceChange(
        "category",
        `https://iptv-org.github.io/iptv/categories/${category}.m3u`,
        category,
      );
    }
  }

  function handleLanguageChange(e) {
    const language = e.target.value;
    if (language) {
      const selectedLang = languages.find((l) => l.code === language);
      onSourceChange(
        "language",
        `https://iptv-org.github.io/iptv/languages/${language}.m3u`,
        selectedLang?.name || language,
      );
    }
  }

  function handleRegionChange(e) {
    const region = e.target.value;
    if (region) {
      const selectedRegion = regions.find((r) => r.code === region);
      onSourceChange(
        "region",
        `https://iptv-org.github.io/iptv/regions/${region}.m3u`,
        selectedRegion?.name || region,
      );
    }
  }

  function handleCountryChange(e) {
    const country = e.target.value;
    if (country) {
      const selectedCountry = countries.find((c) => c.code === country);
      onSourceChange(
        "country",
        `https://iptv-org.github.io/iptv/countries/${country}.m3u`,
        selectedCountry?.name || country,
      );
    }
  }

  function handleCustomUrl() {
    if (customUrl) {
      onSourceChange("custom", customUrl, "Custom Playlist");
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
      <div className="source-type-selector">
        <label>Select Playlist Type:</label>
        <select onChange={handleSourceTypeChange} value={sourceType}>
          <option value="country">By Country</option>
          <option value="category">By Category</option>
          <option value="language">By Language</option>
          <option value="region">By Region</option>
        </select>
      </div>

      {sourceType === "country" && (
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
      )}

      {sourceType === "category" && (
        <div className="source-section">
          <label>Select Category:</label>
          <select onChange={handleCategoryChange} defaultValue="">
            <option value="" disabled>
              Choose a category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      )}

      {sourceType === "language" && (
        <div className="source-section">
          <label>Select Language:</label>
          <select onChange={handleLanguageChange} defaultValue="">
            <option value="" disabled>
              Choose a language
            </option>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {sourceType === "region" && (
        <div className="source-section">
          <label>Select Region:</label>
          <select onChange={handleRegionChange} defaultValue="">
            <option value="" disabled>
              Choose a region
            </option>
            {regions.map((reg) => (
              <option key={reg.code} value={reg.code}>
                {reg.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="source-section">
        <button
          onClick={() => setShowCustom(!showCustom)}
          className="custom-toggle"
        >
          {showCustom ? "Cancel" : "➕ Add Custom URL"}
        </button>

        {showCustom && (
          <div className="custom-url-input">
            <input
              type="url"
              placeholder="https://example.com/playlist.m3u"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
            />
            <button onClick={handleCustomUrl} className="load-btn">
              Load
            </button>
          </div>
        )}
      </div>

      <div className="source-section">
        <label>📁 Upload M3U File:</label>
        <input
          type="file"
          accept=".m3u,.m3u8,text/plain"
          onChange={handleFileUpload}
        />
      </div>
    </div>
  );
}
