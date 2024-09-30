import { useRef, forwardRef, useImperativeHandle } from "react"; // allow us to pass a ref from one component to anohter
import { createPortal } from "react-dom";
const ResultModal = forwardRef(function ResultModal(
  { result, targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = (1 - remainingTime / (targetTime * 1000)) * 100;
  // when refrencing this component from outside ,
  // this object will be the ' control panel '
  // so we are not referencing the acutal inner component <dialog>
  // in order to sperate .
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog className="result-modal" ref={dialog} onClose={onReset}>
      {userLost && <h2>You Lost !</h2>}
      {!userLost && <h2>Your Score {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemainingTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
