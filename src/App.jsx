import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tic_tac_toe, set_tic_tac_toe] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const [active, set_active] = useState([
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ]);

  const [score, set_score] = useState({ x: 0, o: 0 });
  const [modal, set_modal] = useState(false);
  const [answer, set_answer] = useState("");
  const [correct_answer, set_correct_answer] = useState("");
  const [correct, set_correct] = useState(false);
  const [answered, set_answered] = useState(false);

  const [x_turn, set_x_turn] = useState(true);
  const [over, set_over] = useState(false);
  const [question_index, set_question_index] = useState(0);
  const [shuffled_answers, set_shuffled_answers] = useState([]);
  const [row, set_row] = useState(false);
  const [column, set_column] = useState(false);

  const questions = [
    "Which of these is a main symptom of unipolar depression?",
    "Which of these is a main symptom of unipolar depression?",
    "Which of these is a main symptom of unipolar depression?",
    "How many symptoms are there in mild depression over two weeks?",
    "How many symptoms are there in moderate depression over two weeks?",
    "How many symptoms are there in severe depression over two weeks?",
    "How many times more likely are people to be diagnosed with depression from 1940 to 1980?",
    "In England, ________ people will be diagnosed with depression by 2026:",
    "Depression increases the risk of:",
    "Modern times are _______ stressful that previous times",
    "Depressed people tend to miss:",
    "Depressed people increases the ________ in the UK",
    "______% of people with severe depression commit suicide.",
    "_______ million days of work were missed due to depression.",
    "How many people participated in Caspi et al?",
    "What year was Caspi et al conducted?",
    "How many groups were in Caspi et al?",
    "What kind of study was Caspi et al?",
    "What was group 1 in Caspi et al?",
    "What was group 2 in Caspi et al?",
    "What was group 3 in Caspi et al?",
    "How many years was each participant left for in Caspi?",
    "What gene was tested in Caspi et al?",
  ];

  const answers = [
    [
      "Lowering of mood",
      "Poor sleep",
      "Lack of appetite",
      "Not enjoying activities that they used to",
    ],
    [
      "Lack of energy even after resting for a long time",
      "Slowing down of general behaviour",
      "Lack of appetite",
      "Lack of self-esteem",
    ],
    [
      "Lack of motivation to do things",
      "Increase in appetite",
      "Addiction",
      "Leg pain",
    ],
    ["4", "<3", "5-6", "7+"],
    ["5-6", "<3", "4", "7+"],
    ["7+", "<3", "4", "5-6"],
    ["10", "5", "8", "12"],
    ["1.45 million", "1.24 million", "1.24 billion", "1.45 billion"],
    ["Suicide", "Nuclear war", "Leg pain", "Genocide"],
    ["More", "Less", "As", "Neither were stressful"],
    ["Work", "Accidents", "Buses", "India"],
    [
      "Cost of treatment",
      "Rate of accidents",
      "birth rate",
      "number of people",
    ],
    ["9.9", "9.8", "9.7", "9.6"],
    ["2003", "2004", "2005", "2002"],
    ["3", "2", "4", "5"],
    ["Longitudinal", "Case study", "Quasi", "Not a study"],
    [
      "2 short alleles",
      "1 short, 1 long allele",
      "2 long alleles",
      "3 long alleles",
    ],
    [
      "1 short, 1 long allele",
      "2 short alleles",
      "2 long alleles",
      "3 long alleles",
    ],
    [
      "2 long alleles",
      "2 short alleles",
      "1 short, 1 long allele",
      "3 long alleles",
    ],
    ["5", "4", "6", "7"],
    ["5-HTT", "5-HPP", "5-NTT", "7-BLT"],
  ];

  useEffect(() => {
    document.title = "Psychology Tic Tac Toe";
  }, []);

  function shuffle(array) {
    let new_array = [...array];
    let currentIndex = new_array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [new_array[currentIndex], new_array[randomIndex]] = [
        new_array[randomIndex],
        new_array[currentIndex],
      ];
    }

    return new_array;
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const show_question = () => {
    const random = getRandomInt(questions.length);
    set_question_index(random);
    set_correct_answer(answers[random][0]);
    set_shuffled_answers(shuffle(answers[random]));

    set_modal(true);
  };

  const close_question = () => {
    set_question_index(0);
    set_answer("");
    set_answered(false);
    set_correct_answer("");
    set_modal(false);
    set_row(false);
    set_column(false);
  };

  const answer_question = () => {
    set_answered(true);

    if (answer == correct_answer) {
      set_correct(true);
      if (x_turn) {
        addX(row, column);
      } else {
        addO(row, column);
      }

      const is_over = check_if_done();
      if (!is_over) {
        set_x_turn(!x_turn);
      } else {
        if (is_over === "draw") {
          set_score({ x: score.x + 0.5, o: score.o + 0.5 });
        } else if (x_turn) {
          set_score({ x: score.x + 1, o: score.o });
        } else {
          set_score({ x: score.x, o: score.o + 1 });
        }
      }
    } else {
      set_correct(false);
      set_x_turn(!x_turn);
    }
  };

  const addTurn = (r, c) => {
    if (!over) {
      if (tic_tac_toe[r][c] !== "") {
        return false;
      }

      set_row(r);
      set_column(c);

      show_question();
    }
  };

  const addX = (row, column) => {
    const new_board = [...tic_tac_toe];
    new_board[row][column] = "X";

    set_tic_tac_toe(new_board);
  };

  const addO = (row, column) => {
    const new_board = [...tic_tac_toe];
    new_board[row][column] = "O";

    set_tic_tac_toe(new_board);
  };

  const reset = () => {
    set_tic_tac_toe([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    set_active([
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ]);
    set_x_turn(true);
    set_over(false);
  };

  const check_if_done = () => {
    // for Xs

    if (
      tic_tac_toe[0][0] === "X" &&
      tic_tac_toe[0][1] === "X" &&
      tic_tac_toe[0][2] === "X"
    ) {
      set_active([
        [true, true, true],
        [false, false, false],
        [false, false, false],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[1][0] === "X" &&
      tic_tac_toe[1][1] === "X" &&
      tic_tac_toe[1][2] === "X"
    ) {
      set_active([
        [false, false, false],
        [true, true, true],
        [false, false, false],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[2][0] === "X" &&
      tic_tac_toe[2][1] === "X" &&
      tic_tac_toe[2][2] === "X"
    ) {
      set_active([
        [false, false, false],
        [false, false, false],
        [true, true, true],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[0][0] === "X" &&
      tic_tac_toe[1][0] === "X" &&
      tic_tac_toe[2][0] === "X"
    ) {
      set_active([
        [true, false, false],
        [true, false, false],
        [true, false, false],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[0][1] === "X" &&
      tic_tac_toe[1][1] === "X" &&
      tic_tac_toe[2][1] === "X"
    ) {
      set_active([
        [false, true, false],
        [false, true, false],
        [false, true, false],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[0][2] === "X" &&
      tic_tac_toe[1][2] === "X" &&
      tic_tac_toe[2][2] === "X"
    ) {
      set_active([
        [false, false, true],
        [false, false, true],
        [false, false, true],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[0][0] === "X" &&
      tic_tac_toe[1][1] === "X" &&
      tic_tac_toe[2][2] === "X"
    ) {
      set_active([
        [true, false, false],
        [false, true, false],
        [false, false, true],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[0][2] === "X" &&
      tic_tac_toe[1][1] === "X" &&
      tic_tac_toe[2][0] === "X"
    ) {
      set_active([
        [false, false, true],
        [false, true, false],
        [true, false, false],
      ]);
      set_over(true);
      return true;
    }

    // for Os

    if (
      tic_tac_toe[0][0] === "O" &&
      tic_tac_toe[0][1] === "O" &&
      tic_tac_toe[0][2] === "O"
    ) {
      set_active([
        [true, true, true],
        [false, false, false],
        [false, false, false],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[1][0] === "O" &&
      tic_tac_toe[1][1] === "O" &&
      tic_tac_toe[1][2] === "O"
    ) {
      set_active([
        [false, false, false],
        [true, true, true],
        [false, false, false],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[2][0] === "O" &&
      tic_tac_toe[2][1] === "O" &&
      tic_tac_toe[2][2] === "O"
    ) {
      set_active([
        [false, false, false],
        [false, false, false],
        [true, true, true],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[0][0] === "O" &&
      tic_tac_toe[1][0] === "O" &&
      tic_tac_toe[2][0] === "O"
    ) {
      set_active([
        [true, false, false],
        [true, false, false],
        [true, false, false],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[0][1] === "O" &&
      tic_tac_toe[1][1] === "O" &&
      tic_tac_toe[2][1] === "O"
    ) {
      set_active([
        [false, true, false],
        [false, true, false],
        [false, true, false],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[0][2] === "O" &&
      tic_tac_toe[1][2] === "O" &&
      tic_tac_toe[2][2] === "O"
    ) {
      set_active([
        [false, false, true],
        [false, false, true],
        [false, false, true],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[0][0] === "O" &&
      tic_tac_toe[1][1] === "O" &&
      tic_tac_toe[2][2] === "O"
    ) {
      set_active([
        [true, false, false],
        [false, true, false],
        [false, false, true],
      ]);
      set_over(true);
      return true;
    } else if (
      tic_tac_toe[0][2] === "O" &&
      tic_tac_toe[1][1] === "O" &&
      tic_tac_toe[2][0] === "O"
    ) {
      set_active([
        [false, false, true],
        [false, true, false],
        [true, false, false],
      ]);
      set_over(true);
      return true;
    }

    if (
      tic_tac_toe[0][0] &&
      tic_tac_toe[0][1] &&
      tic_tac_toe[0][2] &&
      tic_tac_toe[1][0] &&
      tic_tac_toe[1][1] &&
      tic_tac_toe[1][2] &&
      tic_tac_toe[2][0] &&
      tic_tac_toe[2][1] &&
      tic_tac_toe[2][2]
    ) {
      set_active([
        [true, true, true],
        [true, true, true],
        [true, true, true],
      ]);
      set_over(true);
      return "draw";
    }

    return false;
  };

  return (
    <div className="page">
      <div
        className={"modal-overlay" + (modal ? "" : " hidden")}
        onClick={close_question}
      ></div>
      <div className={"modal" + (modal ? "" : " hidden")}>
        <div className="modal-container">
          <div className="question-container">
            <span className="close" onClick={close_question}>
              x
            </span>
            <p className="question">{questions[question_index]}</p>
            <div className="answers">
              {correct_answer
                ? shuffled_answers.map((card_answer, index) => {
                    return (
                      <div className="answer">
                        <input
                          type="radio"
                          name="answer"
                          id={"answer" + index}
                          onClick={() => set_answer(card_answer)}
                          className="answer-input"
                        />
                        <label
                          htmlFor={"answer" + index}
                          onClick={() => set_answer(card_answer)}
                        >
                          {card_answer}
                        </label>
                      </div>
                    );
                  })
                : null}
              <button
                className="submit"
                disabled={!answer}
                onClick={answer_question}
              >
                Submit
              </button>
            </div>
            <div className={"answer-container" + (answered ? "" : " hidden")}>
              <span className="close" onClick={close_question}>
                x
              </span>
              <p className="big">{correct ? "Correct!" : "Wrong!"}</p>
              <p className="correct-answer">Correct answer: {correct_answer}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="game-container">
        <div className="container">
          <div className="row row-1">
            <div
              className={"cell cell-1 col-1" + (active[0][0] ? " active" : "")}
              onClick={() => addTurn(0, 0)}
            >
              {tic_tac_toe[0][0]}
            </div>
            <div
              className={"cell cell-2 col-2" + (active[0][1] ? " active" : "")}
              onClick={() => addTurn(0, 1)}
            >
              {tic_tac_toe[0][1]}
            </div>
            <div
              className={"cell cell-3 col-3" + (active[0][2] ? " active" : "")}
              onClick={() => addTurn(0, 2)}
            >
              {tic_tac_toe[0][2]}
            </div>
          </div>
          <div className="row row-2">
            <div
              className={"cell cell-4 col-1" + (active[1][0] ? " active" : "")}
              onClick={() => addTurn(1, 0)}
            >
              {tic_tac_toe[1][0]}
            </div>
            <div
              className={"cell cell-5 col-2" + (active[1][1] ? " active" : "")}
              onClick={() => addTurn(1, 1)}
            >
              {tic_tac_toe[1][1]}
            </div>
            <div
              className={"cell cell-6 col-3" + (active[1][2] ? " active" : "")}
              onClick={() => addTurn(1, 2)}
            >
              {tic_tac_toe[1][2]}
            </div>
          </div>
          <div className="row row-3">
            <div
              className={"cell cell-7 col-1" + (active[2][0] ? " active" : "")}
              onClick={() => addTurn(2, 0)}
            >
              {tic_tac_toe[2][0]}
            </div>
            <div
              className={"cell cell-8 col-2" + (active[2][1] ? " active" : "")}
              onClick={() => addTurn(2, 1)}
            >
              {tic_tac_toe[2][1]}
            </div>
            <div
              className={"cell cell-9 col-3" + (active[2][2] ? " active" : "")}
              onClick={() => addTurn(2, 2)}
            >
              {tic_tac_toe[2][2]}
            </div>
          </div>
        </div>
        <button className="reset" onClick={reset}>
          Reset
        </button>
      </div>
      <div className="score-container">
        <p className="title">Scores</p>
        <p className="x">X: {score.x}</p>
        <p className="o">O: {score.o}</p>
      </div>
    </div>
  );
}

export default App;
