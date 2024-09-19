import { useState } from "react";
const COLUMNS: number = 9;
const ROWS: number = 6;

const range = (length: number): number[] => Array.from({ length }, (_, i) => i);

let state: { computedValue: string | number; value: string | number }[][] =
  range(COLUMNS).map(() =>
    range(ROWS).map(() => ({ computedValue: "", value: "" }))
  );

export default function Table() {
  const [inputValue, setInputValue] = useState(state);

  // recive las coordenadas { x, y } para actualizar la matriz con los valores { value }
  function updateCell({
    x,
    y,
    value,
  }: {
    x: number;
    y: number;
    value: string | number;
  }) {
    const newState = structuredClone(state);
    const cell = newState[x][y];
    cell.computedValue = +value; // -> span
    cell.value = value; // -> input

    newState[x][y] = cell;

    state = newState;
    setInputValue(state);
  }

  const handleCellClick = (event: React.MouseEvent): void => {
    const td = (event.target as HTMLElement).closest("td");

    if (!td) return;

    const x = parseInt(td.dataset.x ?? "");
    const y = parseInt(td.dataset.y ?? "");

    if (isNaN(x) || isNaN(y)) {
      console.error("Invalid x or y value in dataset");
      return;
    }

    // const span = td.querySelector("span");
    const input: HTMLInputElement | null | undefined =
      td?.querySelector("input");

    if (!input) return;
    input.setSelectionRange(0, -1);
    input.focus();

    input.addEventListener("keydown", (event: KeyboardEvent): void => {
      if (event.key === "Enter") input.blur();
    });

    input.addEventListener(
      "blur",
      () => {
        if (input.value === state[x][y].value) return;
        updateCell({ x, y, value: input.value });
      },
      { once: true }
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse border border-[#ccc]">
        <thead>
          <tr className="bg-slate-300">
            <th className="w-[64px] border border-[#ccc]"></th>
            {range(COLUMNS).map((i) => (
              <th
                key={i}
                className="text-sm h-6 font-normal border border-[#ccc] w-[120px]"
              >
                {String.fromCharCode(65 + i)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody onClick={(e) => handleCellClick(e)}>
          {range(ROWS).map((row) => (
            <tr key={row}>
              <th className="bg-slate-300 font-normal text-sm w-[64px] text-center border border-[#ccc]">
                {row + 1}
              </th>
              {range(COLUMNS).map((column) => (
                <td
                  key={column}
                  data-x={column}
                  data-y={row}
                  className="relative border border-[#ccc] p-0 h-8"
                >
                  <span
                    defaultValue={state[column][row].computedValue}
                    className="absolute inset-0 flex bg-slate-100 items-center justify-center pointer-events-none"
                  >
                    {inputValue[column][row].computedValue}
                  </span>
                  <input
                    className="absolute inset-0 w-full h-full px-1 opacity-0 focus:outline-none focus:ring-2 focus:opacity-100 focus:ring-cyan-600 focus:border-transparent"
                    defaultValue={state[column][row].value}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
