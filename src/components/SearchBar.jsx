export default function SearchBar({ value, onChange }) {
  return (
    <input
      placeholder="Search channels..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
      }}
    />
  );
}
