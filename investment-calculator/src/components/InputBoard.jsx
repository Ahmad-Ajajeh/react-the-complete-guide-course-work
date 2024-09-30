import { useState } from "react";

import UserInput from "./UserInput";
import { calculateInvestmentResults } from "../util/investment";

export default function InputBoard({ handleInputsChange }) {
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [annualInvestment, setannualInvestment] = useState(0);
  const [expectedReturn, setExpectedReturn] = useState(0);
  const [duration, setDuration] = useState(0);

  function handleInitialInvestmentChange(event) {
    setInitialInvestment(event.target.value);
    handleInputsChange(() =>
      calculateInvestmentResults({
        initialInvestment,
        annualInvestment,
        expectedReturn,
        duration,
      })
    );
  }

  function handleAnnualInvestmentChange(event) {
    setannualInvestment(event.target.value);
    handleInputsChange(() =>
      calculateInvestmentResults({
        initialInvestment,
        annualInvestment,
        expectedReturn,
        duration,
      })
    );
  }

  function handleExpectedReturnChange(event) {
    setExpectedReturn(event.target.value);
    handleInputsChange(() =>
      calculateInvestmentResults({
        initialInvestment,
        annualInvestment,
        expectedReturn,
        duration,
      })
    );
  }

  function handleDurationChange(event) {
    setDuration(event.target.value);
    handleInputsChange(() =>
      calculateInvestmentResults({
        initialInvestment,
        annualInvestment,
        expectedReturn,
        duration,
      })
    );
  }

  return (
    <span className="input-group">
      <UserInput
        label="INITIAL INVESTMENT"
        handleClick={handleInitialInvestmentChange}
      />
      <UserInput
        label="ANNUAL INVESTMENT"
        handleClick={handleAnnualInvestmentChange}
      />
      <UserInput
        label="EXPECTED RETURN"
        handleClick={handleExpectedReturnChange}
      />
      <UserInput label="DURATION" handleClick={handleDurationChange} />
    </span>
  );
}
