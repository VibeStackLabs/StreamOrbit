export default function CategoryFilter({ categories, current, onChange }) {
  if (categories.length <= 1) return null;

  return (
    <div className="category-filter">
      <h3>📑 Categories</h3>
      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={current === cat ? "active" : ""}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
