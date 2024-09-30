import { useState } from "react";

import Header from "./components/Header.jsx";
import InputBoard from "./components/InputBoard.jsx";
import DataTable from "./components/DataTable.jsx";

import "./index.css";
function App() {
  const [annualData, setAnnualData] = useState([]);

  return (
    <>
      <Header id="header" />
      <div id="calculator">
        <InputBoard handleInputsChange={(method) => setAnnualData(method)} />
        <DataTable annualData={annualData} />
      </div>
    </>
  );
}

export default App;
