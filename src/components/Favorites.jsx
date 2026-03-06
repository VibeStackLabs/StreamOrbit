export default function Favorites({ list, onPlay, onRemove }) {
  if (!list.length) {
    return (
      <div className="favorites empty">
        <h3>⭐ Favorites</h3>
        <p className="empty-message">No favorites yet</p>
      </div>
    );
  }

  return (
    <div className="favorites">
      <h3>⭐ Favorites ({list.length})</h3>
      <div className="favorites-list">
        {list.map((ch, i) => (
          <div key={i} className="fav-item">
            <span onClick={() => onPlay(ch.url)} title={ch.name}>
              {ch.name.length > 20 ? ch.name.substring(0, 20) + "..." : ch.name}
            </span>
            <button
              className="remove-fav"
              onClick={() => onRemove(ch.url)}
              title="Remove from favorites"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
