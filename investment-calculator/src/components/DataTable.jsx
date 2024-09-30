export default function DataTable({ annualData }) {
  return (
    <table id="result" className="center">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {annualData.map((reg, index) => {
          return (
            <tr key={index}>
              <td>{reg.valueEndOfYear}</td>
              <td>{reg.interest}</td>
              <td>{reg.a}</td>
              <td>{reg.valueEndOfYear}</td>
              <td>blah</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
