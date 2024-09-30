import { useState } from "react";

import Header from "./components/Header";
import UserInput from "./components/UserInput";
import Results from "./components/Results";
function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  const inputIsValid = userInput.duration > 0;

  function handleChange(inputIdentifier, newValue) {
    setUserInput((prevInput) => {
      return {
        ...prevInput,
        [inputIdentifier]: +newValue,
      };
    });
    console.log(userInput);
  }

  return (
    <>
      <Header></Header>
      <UserInput onChangeInput={handleChange} userInput={userInput}></UserInput>
      {inputIsValid && <Results input={userInput} />}
      {!inputIsValid && (
        <p className="center">PLEASE ENTER A DURATION GREATER THAN ZERO</p>
      )}
    </>
  );
}

export default App;
