import { useState, useCallback } from "react";

import Question from "./Question";
import Summary from "./Summary";

import QUESTIONS from "../questions";

// useEffect also if you want to save the value between renderes
// and update it only upon a change in some dependency .
// useRef saves the value between renderes but does not have dependecy .

export default function Quiz() {
  // you should optimize the state handling so that
  // you use minimum state values and derive the rest .
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, selectedAnswer];
    });
  },
  []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex} // key is a prop reserved for react
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
