import logo from "../assets/investment-Calculator-logo.png";

export default function Header() {
  return (
    <header id="header">
      <img src={logo} alt="logo - showing a money bag" />
      <h1>React Investment Calculator</h1>
    </header>
  );
}
