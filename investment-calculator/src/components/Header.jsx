import CALCULATOR_LOGO from "../assets/investment-calculator-logo.png";

export default function Header({ ...props }) {
  return (
    <header {...props}>
      <img src={CALCULATOR_LOGO} />
      <h1>React Investment Calculator</h1>
    </header>
  );
}
