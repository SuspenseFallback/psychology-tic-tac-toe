
export default function QuestionModal({
  isOpen,
  questionData,
  shuffledOptions,
  selectedAnswer,
  onSelectAnswer,
  onSubmitAnswer,
  onClose,
  isAnswered,
  isCorrect,
}) {
  if (!isOpen || !questionData) return null;

  return (
    <>
      <div
        className={`modal-overlay ${isOpen ? '' : 'hidden'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`modal ${isOpen ? '' : 'hidden'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-question-title"
      >
        <div className="modal-container">
          <div className="question-container">
            <button
              type="button"
              className="close"
              onClick={onClose}
              aria-label="Close question modal"
            >
              &times;
            </button>
            <h3 id="modal-question-title" className="question">
              {questionData.question}
            </h3>
            <form
              className="answers"
              onSubmit={(e) => {
                e.preventDefault();
                onSubmitAnswer();
              }}
            >
              {shuffledOptions.map((option, index) => {
                const inputId = `answer-${index}`;
                return (
                  <div key={`${option}-${index}`} className="answer">
                    <input
                      type="radio"
                      name="answer"
                      id={inputId}
                      checked={selectedAnswer === option}
                      onChange={() => onSelectAnswer(option)}
                      className="answer-input"
                    />
                    <label htmlFor={inputId}>{option}</label>
                  </div>
                );
              })}
              <button
                type="submit"
                className="submit"
                disabled={!selectedAnswer}
              >
                Submit
              </button>
            </form>
            <div className={`answer-container ${isAnswered ? '' : 'hidden'}`}>
              <button
                type="button"
                className="close"
                onClick={onClose}
                aria-label="Close answer feedback"
              >
                &times;
              </button>
              <p className="big">{isCorrect ? 'Correct!' : 'Wrong!'}</p>
              <p className="correct-answer">
                Correct answer: {questionData.correctAnswer}
              </p>
              <button
                type="button"
                className="continue-btn"
                onClick={onClose}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
