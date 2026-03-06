export default function CategoryFilter({ categories, current, onChange }) {
  return (
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
  );
}
