export async function loadEPG() {
  const res = await fetch("https://iptv-org.github.io/epg/guides/in.xml");

  const text = await res.text();

  const parser = new DOMParser();
  const xml = parser.parseFromString(text, "text/xml");

  return xml;
}
