import { useEffect, useState, useCallback } from 'react';
import './App.css';
import { QUESTIONS_DATA } from './data/questions';
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import QuestionModal from './components/QuestionModal';

const INITIAL_BOARD = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const INITIAL_ACTIVE = [
  [false, false, false],
  [false, false, false],
  [false, false, false],
];

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function App() {
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [activeCells, setActiveCells] = useState(INITIAL_ACTIVE);
  const [score, setScore] = useState({ x: 0, o: 0 });
  const [isXTurn, setIsXTurn] = useState(true);
  const [isOver, setIsOver] = useState(false);

  const [targetCell, setTargetCell] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    document.title = 'Psychology Tic Tac Toe';
  }, []);

  const checkWinner = useCallback((currentBoard) => {
    const lines = [
      // Rows
      { coords: [[0, 0], [0, 1], [0, 2]] },
      { coords: [[1, 0], [1, 1], [1, 2]] },
      { coords: [[2, 0], [2, 1], [2, 2]] },
      // Columns
      { coords: [[0, 0], [1, 0], [2, 0]] },
      { coords: [[0, 1], [1, 1], [2, 1]] },
      { coords: [[0, 2], [1, 2], [2, 2]] },
      // Diagonals
      { coords: [[0, 0], [1, 1], [2, 2]] },
      { coords: [[0, 2], [1, 1], [2, 0]] },
    ];

    for (const line of lines) {
      const [[r1, c1], [r2, c2], [r3, c3]] = line.coords;
      const symbol = currentBoard[r1][c1];
      if (
        symbol &&
        symbol === currentBoard[r2][c2] &&
        symbol === currentBoard[r3][c3]
      ) {
        const winningPattern = INITIAL_ACTIVE.map((row) => [...row]);
        line.coords.forEach(([r, c]) => {
          winningPattern[r][c] = true;
        });
        return { winner: symbol, pattern: winningPattern };
      }
    }

    const isFull = currentBoard.every((row) => row.every((cell) => cell !== ''));
    if (isFull) {
      const fullPattern = [
        [true, true, true],
        [true, true, true],
        [true, true, true],
      ];
      return { winner: 'draw', pattern: fullPattern };
    }

    return null;
  }, []);

  const handleCellClick = (row, col) => {
    if (isOver || board[row][col] !== '') return;

    setTargetCell({ row, col });
    const randomIndex = Math.floor(Math.random() * QUESTIONS_DATA.length);
    setQuestionIndex(randomIndex);
    setShuffledOptions(shuffleArray(QUESTIONS_DATA[randomIndex].options));
    setSelectedAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsAnswered(false);
    setSelectedAnswer('');
    setTargetCell(null);
  };

  const handleSubmitAnswer = () => {
    if (!targetCell || isAnswered) return;

    setIsAnswered(true);
    const currentQuestion = QUESTIONS_DATA[questionIndex];
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      const currentPlayerSymbol = isXTurn ? 'X' : 'O';
      const newBoard = board.map((r, rIdx) =>
        rIdx === targetCell.row
          ? r.map((c, cIdx) => (cIdx === targetCell.col ? currentPlayerSymbol : c))
          : [...r]
      );
      setBoard(newBoard);

      const gameResult = checkWinner(newBoard);
      if (gameResult) {
        setIsOver(true);
        setActiveCells(gameResult.pattern);
        if (gameResult.winner === 'draw') {
          setScore((prev) => ({ x: prev.x + 0.5, o: prev.o + 0.5 }));
        } else if (gameResult.winner === 'X') {
          setScore((prev) => ({ ...prev, x: prev.x + 1 }));
        } else if (gameResult.winner === 'O') {
          setScore((prev) => ({ ...prev, o: prev.o + 1 }));
        }
      } else {
        setIsXTurn((prev) => !prev);
      }
    } else {
      setIsXTurn((prev) => !prev);
    }
  };

  const handleReset = () => {
    setBoard(INITIAL_BOARD);
    setActiveCells(INITIAL_ACTIVE);
    setIsXTurn(true);
    setIsOver(false);
    setIsModalOpen(false);
    setIsAnswered(false);
    setSelectedAnswer('');
    setTargetCell(null);
  };

  return (
    <div className="page">
      <main className="game-container">
        <h1 className="game-title">Psychology Tic-Tac-Toe</h1>
        <Board
          board={board}
          activeCells={activeCells}
          onCellClick={handleCellClick}
          isOver={isOver}
        />
        <button type="button" className="reset" onClick={handleReset}>
          Reset Game
        </button>
      </main>

      <ScoreBoard score={score} isXTurn={isXTurn} isOver={isOver} />

      <QuestionModal
        isOpen={isModalOpen}
        questionData={QUESTIONS_DATA[questionIndex]}
        shuffledOptions={shuffledOptions}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={setSelectedAnswer}
        onSubmitAnswer={handleSubmitAnswer}
        onClose={handleCloseModal}
        isAnswered={isAnswered}
        isCorrect={isCorrect}
      />
    </div>
  );
}
