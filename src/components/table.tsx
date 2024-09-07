export default function Table() {
  const COLUMNS = 6;
  const ROWS = 12;

  const range = (length: number) => Array.from({ length }, (_, i) => i);

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {range(COLUMNS).map((i) => (
            <th key={i}>{i + 1}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {range(ROWS).map((rows) => (
            <tr key={rows}>
              <td>{rows + 1}</td>
              {range(COLUMNS).map((columns) => (
                <td data-x={columns} data-y={rows}>
                  <span></span>
                  <input key={columns} type="text" value=""></input>
                </td>
              ))}
            </tr>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
