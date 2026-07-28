import Square from './Square';

export default function Board({ board, activeCells, onCellClick, isOver }) {
  return (
    <div className="container" role="grid" aria-label="Tic Tac Toe Board">
      {board.map((row, rIdx) => (
        <div key={`row-${rIdx}`} className={`row row-${rIdx + 1}`} role="row">
          {row.map((cellValue, cIdx) => (
            <Square
              key={`cell-${rIdx}-${cIdx}`}
              row={rIdx}
              col={cIdx}
              value={cellValue}
              isActive={activeCells[rIdx][cIdx]}
              onClick={() => onCellClick(rIdx, cIdx)}
              disabled={isOver}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
