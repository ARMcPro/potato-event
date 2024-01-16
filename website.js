function sortPlayerData(myDict){
  const sortedArray = Object.entries(myDict)
  .map(([key, value]) => [key, value[0], value.length-1])
  .sort((a, b) => b[2] - a[2] || a[0] - b[0])
  .map(([key, firstValue, lengthMinusOne], index) => [index + 1, firstValue, lengthMinusOne]);
  var data = sortedArray;
  data.unshift(['#','Name','Potatoes']);
  const table = document.createElement('table');
  table.setAttribute("id", "content-table");
  if (data.length === 1) {
    data.push(['–','–','–'])
  };

  const headerRow = table.insertRow();
  data[0].forEach((header) => {
    const headerCell = headerRow.insertCell();
    headerCell.textContent = header;
    headerCell.classList.add('boldHeader');
  });

  for (let i = 1; i < data.length; i++) {
    const row = table.insertRow();
    data[i].forEach((cell, index) => {
      const cellElement = row.insertCell();
      cellElement.textContent = cell;
    });
  }
  
  const container = document.getElementById('table-container');
  container.appendChild(table);
};

function getPlayerData(playerData, PDATA){
  var result = {};
  for (const key in PDATA) {
    const count = PDATA[key].filter(item => playerData.slice(1).includes(item)).length;
    if (count > 0) {
      result[key] = count;
    }
  }
  console.log(result)
  var sortedArray = Object.entries(result)
  .map(([key, value]) => [key, key, value])
  .sort((a, b) => a[2] - b[2] || a[0] - b[0])
  .map(([_, firstValue, lengthMinusOne], index) => [index + 1, firstValue, lengthMinusOne]);
  var data = sortedArray;
  data.unshift(['#','Plot ID','Potatoes']);
  const table = document.createElement('table');
  table.setAttribute("id", "content-table");
  if (data.length === 1) {
    data.push(['–','–','–'])
  };

  const headerRow = table.insertRow();
  data[0].forEach((header) => {
    const headerCell = headerRow.insertCell();
    headerCell.textContent = header;
    headerCell.classList.add('boldHeader');
  });

  for (let i = 1; i < data.length; i++) {
    const row = table.insertRow();
    data[i].forEach((cell, index) => {
      const cellElement = row.insertCell();
      cellElement.textContent = cell;
    });
  }
  
  const container = document.getElementById('table-container');
  container.appendChild(table);
};

function findPlayerKey(obj, str) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key][0].toLowerCase() === str.toLowerCase()) {
        return key;
      }
    }
  }
  return null;
};

function storePlayerData(playerData){
  playersjson = playerData;
};

function storePlotData(plotData){
  plotsjson = plotData;
};


fetch('data/playerdata.json')
  .then(response => response.text())
  .then(data => {
    storePlayerData(JSON.parse(data));
    sortPlayerData(JSON.parse(data));
  })
  .catch(error => console.error(error));

fetch('data/plotdata.json')
  .then(response => response.text())
  .then(data => {
    storePlotData(JSON.parse(data));;
  })
  .catch(error => console.error(error));

var searchbox = document.getElementById("searchbox");

function processInput() {
  var value = searchbox.value.trim();
  document.getElementById("content-table").remove();
  if (value === ''){
    sortPlayerData(playersjson);
    console.log('clear');
  } else {
    var playerName = findPlayerKey(playersjson, value);
    if (playerName === null) {
      console.log('no data found');
      const table = document.createElement('table');
      table.setAttribute("id", "content-table");
      const headerRow = table.insertRow(0);
      const headerCell = headerRow.insertCell(0);
      headerCell.textContent = "No Data Found";
      headerCell.classList.add('redHeader');
      console.log(table);
      const container = document.getElementById('table-container');
      container.appendChild(table);
      return
    } else {
      console.log(playerName)
      getPlayerData(playersjson[playerName],plotsjson);
    }
    console.log(value);
  };
}

searchbox.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    processInput();
  }
});

var submitSearch = document.getElementById("submit-search");
submitSearch.addEventListener("click", function() {
  submitSearch.classList.add("clicked");
  processInput();
});

var clearSearch = document.getElementById("clear-search");
clearSearch.addEventListener("click", function() {
  clearSearch.classList.add("clicked");
  searchbox.value = "";
  processInput();
});
