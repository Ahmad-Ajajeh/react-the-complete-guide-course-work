import { useState } from "react";

export default function UserInput({ onChangeInput, userInput }) {
  console.log(userInput);
  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label>Initial Investment</label>
          <input
            type="number"
            required
            //value={userInput.initialInvestment}
            onChange={(event) =>
              onChangeInput("intialInvestment", event.target.value)
            }
          ></input>
        </p>
        <p>
          <label>Anuual Investment</label>
          <input
            type="number"
            required
            onChange={(event) =>
              onChangeInput("annualInvestment", event.target.value)
            }
            value={userInput.annualInvestment}
          ></input>
        </p>
      </div>
      <div className="input-group">
        <p>
          <label>Expected Return</label>
          <input
            type="number"
            required
            onChange={(event) =>
              onChangeInput("expectedReturn", event.target.value)
            }
            value={userInput.expectedReturn}
          ></input>
        </p>
        <p>
          <label>Duration</label>
          <input
            type="number"
            required
            onChange={(event) => onChangeInput("duration", event.target.value)}
            value={userInput.duration}
          ></input>
        </p>
      </div>
    </section>
  );
}
