
export default function ScoreBoard({ score, isXTurn, isOver }) {
  return (
    <div className="score-container" aria-live="polite">
      <h2 className="title">Scores</h2>
      <div className="score-details">
        <p className={`x ${isXTurn && !isOver ? 'current-turn' : ''}`}>
          X: {score.x}
        </p>
        <p className={`o ${!isXTurn && !isOver ? 'current-turn' : ''}`}>
          O: {score.o}
        </p>
      </div>
      <p className="turn-indicator">
        {isOver ? 'Game Over!' : `Current Turn: Player ${isXTurn ? 'X' : 'O'}`}
      </p>
    </div>
  );
}
