import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    console.log("timer set");
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    // the following is useEffect clean up function
    // it executes before this use Effect executes again
    // i.e (when its dependencies change)
    // and / or before this component is removed from the DOM

    // it is worth noting that this function does not execute before
    // this useEffect is executed FOR THE FIRST TIME .
    // ONLY SUBSEQUENT EXECUTOINS OR WHEN THIS COMPONENT IS REMOVED .
    return () => {
      console.log("cleaning up timer");
      clearTimeout(timer);
    };
  }, [onConfirm]); //dependencies are props and states used inside the side effect .

  // functions and objects are dangerous dependencies
  // because in every execution they differ ( we compare the reference
  // and not the value of the object or the function )
  // that's why in every execution of the component this dependency differ .

  // a side effect is not directly related to render
  // the return jsx code , so if it was not executed
  // the jsx could still be rendered .

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar timer={TIMER} />
    </div>
  );
}
