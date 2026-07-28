
export default function Square({ value, isActive, onClick, row, col, disabled }) {
  return (
    <button
      type="button"
      className={`cell cell-${row * 3 + col + 1} col-${col + 1} ${isActive ? 'active' : ''}`}
      onClick={onClick}
      disabled={disabled || value !== ''}
      aria-label={`Row ${row + 1}, Column ${col + 1}${value ? `, marked with ${value}` : ''}`}
    >
      <span className="sign">{value}</span>
    </button>
  );
}
