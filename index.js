const express = require('express');
require("dotenv").config();
run = ""

const app = express();
const fs = require('fs');
const pictureMaker = require('picture-maker');

const resrictedPlayers = ['0'];

var old_timestamp = 10;

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
};

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get('/hints', (req, res) => {
  res.sendFile(__dirname + "/hints.html");
});

app.get('/faq', (req, res) => {
  res.sendFile(__dirname + "/faq.html");
});

app.get('/blog', (req, res) => {
  res.sendFile(__dirname + "/Potatolord_blog.html");
})


async function fetchName(uuid) {
  return await fetch(`https://api.mojang.com/user/profile/${uuid}`)
    .then((response) => response.json())
}

function getKeyPlacement(jsonObj, targetKey) {
  const sortedKeys = Object.entries(jsonObj)
      .map(([key, value]) => ({ key, length: value.length }))
      .sort((a, b) => b.length - a.length || (b.key > a.key ? -1 : 1));

  let rank = 1;
  let lastLength = sortedKeys[0].length;

  for (let i = 0; i < sortedKeys.length; i++) {
      if (sortedKeys[i].length < lastLength) {
          rank = i + 1;
      }
      if (sortedKeys[i].key === targetKey) {
          return rank;
      }
      lastLength = sortedKeys[i].length;
  }

  return -1;
}


app.post('/post', express.json(), (req,res) => {
  console.log(req.body);
  try {
    const P = 'P';
    let timestamp = new Date().getTime() / 1000;
    if (timestamp >= 1717164000 && timestamp < 9987161601) {
      let plotID = req.headers['user-agent'].split(' (')[1].split(', ')[0];
      fs.readFile(__dirname + "/data/plotdata.json", async function (err, data) {
        fs.readFile(__dirname + "/data/id_name.json", async function (nameErr, nameData) {
          const nameConvert = JSON.parse(nameData);
          const plotName = nameConvert[plotID];
          const json = JSON.parse(data);
          if (typeof json[plotName] !== 'undefined' && typeof req.body['point'] === 'string' && typeof req.body['uuid'] === 'string' && req.body['key'] === process.env[P + plotID] && !resrictedPlayers.includes(req.body['uuid']) && typeof process.env[P + plotID] === 'string') {
            if (json[plotName].includes(req.body['point'])) {
              fs.readFile(__dirname + "/data/playerdata.json", async function (perr, pdata) {
                var pjson = JSON.parse(pdata);
                if (typeof pjson[req.body['uuid']] === 'undefined')  {
                  console.log("new");
                  var pname = await fetchName(req.body['uuid']);
                  pname = pname["name"];
                  if (typeof pname !== 'undefined') {
                    var keyName = req.body['uuid']
                    pjson[keyName] = [pname, req.body['point']];
                    fs.writeFileSync(__dirname + "/data/playerdata.json", JSON.stringify(pjson));
                  };
                }
                else if (!pjson[req.body['uuid']].includes(req.body['point'])) {
                  console.log("old");
                  var keyName = req.body['uuid'];
                  var pname = await fetchName(req.body[keyName])["name"];
                  pjson[keyName].push(req.body['point']);
                  fs.writeFileSync(__dirname + "/data/playerdata.json", JSON.stringify(pjson));
                };
              });
            };
          };
        });
      });
    };
  }
  catch(err) {
    console.log(err);
  };
  res.send();
});


app.get('/sync', async (req, res) => {
  if (!typeof old_timestamp === 'number') {
    old_timestamp = 10;
  };
  let timestamp = new Date().getTime();
  res.sendFile(__dirname + "/index.html");
  if ((timestamp - old_timestamp) >= 86400000) {
    console.log(old_timestamp);
    old_timestamp = new Date().getTime() + 86400000;
    fs.readFile(__dirname + "/data/playerdata.json", async function (perr, pdata) {
      const pjson = JSON.parse(pdata);
      for (const [key, value] of Object.entries(pjson)) {
        let newName = await fetchName(key);
        if (typeof newName["name"] === 'string'){
          pjson[key][0] = newName["name"];
          await sleep(250);
        };
      };
      fs.writeFileSync(__dirname + "/data/playerdata.json", JSON.stringify(pjson));
      console.log("Successfully Synced!")
    });
    old_timestamp = new Date().getTime();
  };
});

app.get('/player', (req, resp) => {
  const uuid = req.query['uuid'];
  if (typeof uuid === 'string') {
    fs.readFile(__dirname + "/data/playerdata.json", async function (err, data) {
      const playersjson = JSON.parse(data);
      if (uuid in playersjson) {
        const placement = getKeyPlacement(playersjson, uuid);
        resp.send(`${playersjson[uuid][0]} - ${placement} - ${playersjson[uuid].length - 1}`);
      }
      else {
        resp.send();
      }
    });
  }
  else {
    resp.send();
  }
});

app.listen(8080, () => {
  console.log('Server started at ' + new Date().toUTCString());
});
