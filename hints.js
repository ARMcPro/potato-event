const text = `

Come back at:
31/05/2024
14:00 UTC


`.trim();

const tableBody = document.querySelector('#table-container tbody');

const lines = text.split('\n');
const filteredLines = lines.filter(line => line.trim() !== '');

let currentPlotName = '';
let hints = '';

filteredLines.forEach(line => {
  if (line.endsWith(':')) {
    if (currentPlotName !== '') {
      const row = document.createElement('tr');

      const plotNameCell = document.createElement('td');
      plotNameCell.textContent = currentPlotName;
      row.appendChild(plotNameCell);

      const hintCell = document.createElement('td');
      hintCell.classList.add('hints-cell');
      hintCell.innerHTML = hints;
      row.appendChild(hintCell);

      tableBody.appendChild(row);
    }

    currentPlotName = line.replace(':', '');
    hints = '';
  } else {
    hints += line + '<br>';
  }
});

if (currentPlotName !== '') {
  const row = document.createElement('tr');

  const plotNameCell = document.createElement('td');
  plotNameCell.textContent = currentPlotName;
  row.appendChild(plotNameCell);

  const hintCell = document.createElement('td');
  hintCell.classList.add('hints-cell');
  hintCell.innerHTML = hints;
  row.appendChild(hintCell);

  tableBody.appendChild(row);
}