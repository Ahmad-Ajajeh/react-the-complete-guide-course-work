import { useInput } from "../hooks/useInput.js";

import Input from "./Input.jsx";
import { isEmail, hasMinLength, isNotEmpty } from "../util/validation.js";

export default function Login() {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailError,
  } = useInput("", (value) => {
    return isEmail(value) && isNotEmpty(value);
  });

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordError,
  } = useInput("", (value) => {
    return hasMinLength(value, 6);
  });

  function handleSubmit(event) {
    // prevents the default behaviour of sending http request
    // once submitting .
    event.preventDefault();

    // even when validating inputs upon blur state and key stroke
    // it is also recommended to add validation in the handle submit function
    // in case the user neglected your validations hints

    if (emailError || passwordError) {
      return;
    }

    console.log(emailValue, passwordValue);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          value={emailValue}
          error={emailError && "Please enter a valid email ."}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
          value={passwordValue}
          error={passwordError && "Please enter a valid password ."}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}

// htmlFor is the equivalen of "for"
// class and for keywords are reserved .
// the default type of a button insdie a from is submit

// LEGACY :
// function handleInputChange(identifier, value) {
//   setEnteredValues((prevValue) => ({
//     ...prevValue,
//     [identifier]: value,
//   }));

//   // I found that the best approach is to comment
//   // the follwoing snippet :

//   setDidEdit((prevEdit) => ({
//     ...prevEdit,
//     [identifier]: false,
//   }));
// }

// function handleInputBlur(identifier) {
//   setDidEdit((prevEdit) => ({
//     ...prevEdit,
//     [identifier]: true,
//   }));
// }

/* <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
            onBlur={() => handleInputBlur("password")}
            value={enteredValues.password}
          />
        </div> */
