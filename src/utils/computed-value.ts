export function computeValue(value: string): number | undefined {
  // Si no es una fórmula (no empieza con "="), devolver el número directamente
  if (!value.startsWith("=")) return +value;

  // Eliminar el "=" del principio y eliminar los espacios en blanco
  const formula = value.slice(1).replace(/\s+/g, "");

  let currentNumber = "";
  const numbers: number[] = [];
  const operators: string[] = [];

  // Recorrer la fórmula para separar números y operadores
  for (let i = 0; i < formula.length; i++) {
    const char = formula[i];

    if (!isNaN(Number(char)) || char === ".") {
      // Acumulamos los dígitos en currentNumber si es un número o un punto decimal
      currentNumber += char;
    } else if (["+", "-", "*", "/"].includes(char)) {
      // Cuando encontramos un operador, guardamos el número acumulado
      numbers.push(parseFloat(currentNumber));
      operators.push(char);
      currentNumber = ""; // Reiniciar el acumulador
    }
  }

  // Asegurarnos de agregar el último número acumulado
  if (currentNumber) {
    numbers.push(parseFloat(currentNumber));
  }

  // Realizamos las operaciones en el orden en que aparecen
  let result = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i];
    const nextNumber = numbers[i + 1];

    switch (operator) {
      case "+":
        result += nextNumber;
        break;
      case "-":
        result -= nextNumber;
        break;
      case "*":
        result *= nextNumber;
        break;
      case "/":
        result /= nextNumber;
        break;
    }
  }

  return result;
}
