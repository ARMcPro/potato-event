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
      if ((index === 1) && (cell !== '–')) {
        var span = document.createElement("span");
        span.textContent = cell;
        span.classList.add("clickable");
        span.addEventListener("click", function() {
          searchbox.value = cell;
          processInput();
        });
        cellElement.appendChild(span);
      } else {
        cellElement.textContent = cell;
      }
    });
  }
  
  const container = document.getElementById('table-container');
  container.appendChild(table);
};

function getPlayerData(playerData, PDATA){
  var result = {};
  for (const key in PDATA) {
    const items = PDATA[key].filter(item => playerData.slice(1).includes(item));
    if (items.length > 0) {
      console.log(key)
      let newItems = items.map(i => idsjson[key][idsjson[key].indexOf(i) + Math.floor(idsjson[key].length/2)]);
      result[`${key} (${getKeyByValue(plotnamesjson, key)})`] = '🞄' + newItems.join('<br>🞄');
    }
  }
  var sortedArray = Object.entries(result)
    .map(([key, value]) => [key, key, value])
    .sort((a, b) => a[2].length - b[2].length)
    .map(([_, firstValue, lengthMinusOne], index) => [index + 1, firstValue, lengthMinusOne]);
  var data = sortedArray;
  data.unshift(['#','Plot','Potatoes']);
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
      cellElement.innerHTML = cell;
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

function storePlotNameData(nameData){
  plotnamesjson = nameData;
};

function storeIdData(idData){
  idsjson = idData;
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

fetch('data/id_name.json')
  .then(response => response.text())
  .then(data => {
    storePlotNameData(JSON.parse(data));;
  })
  .catch(error => console.error(error));

fetch('data/id_converter.json')
  .then(response => response.text())
  .then(data => {
    storeIdData(JSON.parse(data));;
  })
  .catch(error => console.error(error));

var searchbox = document.getElementById("searchbox");

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}
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

const submitSearch = document.getElementById("submit-search");
submitSearch.addEventListener("click", function() {
  submitSearch.classList.add("clicked");
  processInput();
});

const clearSearch = document.getElementById("clear-search");
clearSearch.addEventListener("click", function() {
  clearSearch.classList.add("clicked");
  searchbox.value = "";
  processInput();
});