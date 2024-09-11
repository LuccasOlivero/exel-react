export default function Table() {
  const COLUMNS = 9;
  const ROWS = 6;

  const range = (length: number) => Array.from({ length }, (_, i) => i);

  const state = range(COLUMNS).map(() =>
    range(ROWS).map((j) => ({ computedValue: j, value: j }))
  );

  // encuentra la celda mas cercana al click
  const handleCellClick = (event: React.MouseEvent) => {
    const td = (event.target as HTMLElement).closest("td");

    if (!td) return;

    const { x, y } = td.dataset;

    // const input = td.querySelector("input");
    // const span = td.querySelector("span");

    console.log({ x, y });
  };

  return (
    <table className="border-collapse m-auto border border-[#ccc]">
      <thead className="first:bg-slate-300">
        <tr>
          <th></th>
          {range(COLUMNS).map((i) => (
            <th
              key={i}
              className="text-sm h-6 font-normal border border-[#ccc]"
            >
              {String.fromCharCode(65 + i)}
            </th>
          ))}
        </tr>
      </thead>

      <tbody onClick={(e) => handleCellClick(e)}>
        {range(ROWS).map((row) => (
          <tr key={row} className="border border-[#ccc]">
            <th className="bg-slate-300 font-normal text-sm w-[64px] text-center relative">
              {row + 1}
            </th>
            {range(COLUMNS).map((column) => (
              <td
                key={column}
                data-x={column}
                data-y={row}
                className="fist:bg-red-400 relative"
              >
                <span className="w-full absolute align-middle inline-flex justify-center items-center inset-0">
                  {state[column][row].computedValue}
                </span>
                <input
                  className="w-full relative flex z-10 justify-center items-center inset-0 border opacity-0 pointer-events-none focus:outline-sky-500"
                  value={state[column][row].value}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
