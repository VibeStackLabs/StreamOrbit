export default function Favorites({ list, onPlay }) {
  if (!list.length) return null;

  return (
    <div>
      <h3>⭐ Favorites</h3>

      {list.map((ch, i) => (
        <div key={i} onClick={() => onPlay(ch.url)}>
          {ch.name}
        </div>
      ))}
    </div>
  );
}
