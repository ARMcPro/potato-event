const express = require('express');
require("dotenv").config();
run = ""

const app = express();
const fs = require('fs');
const {createCanvas, loadImage, registerFont} = require('canvas');


const resrictedPlayers = ['0'];

var old_timestamp = 10;

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
};

registerFont(`${__dirname}/Minecraft_Small_Caps.otf`, {family: 'Minecraft'});
async function generateImage({playerName, placement, potatoesCollected, playerUUID}) {
  // Constants
  const width = 128;
  const height = 128;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  const placementColors = ["#FAEE4D", "#FFFFFF", "#D87F33", "#A4A8B8"]
  const placementShadowColors = ["#ba8524", "#545760", "#9f5224", "#4c4c4c"]
  const placementLastIndex = placementColors.length-1;

  // Format parameters
  potatoesCollected = formatNumber(potatoesCollected)
  placement = formatNumber(placement);
  playerUUID = playerUUID === undefined ? '' : playerUUID;
  playerName = playerName === undefined ? 'error' : playerName;

  // Make rendering pixel-perfect
  ctx.antialias = 'none'; // Text
  ctx.quality = 'best';
  ctx.textRendering = "optimizeLegibility";
  ctx.imageSmoothingEnabled = false; // Images

  // Register the font we are going to be using for the entire image
  registerFont(`${__dirname}/Minecraft_Small_Caps.otf`, {family: 'Minecraft'});

  // -- Image Rendering --

  // Load the background image and draw it
  const backgroundImage = await loadImage(__dirname + '/background.png');
  ctx.drawImage(backgroundImage, 0, 0, width, height);

  // Load the placement player head frame
  const playerHeadFrame = await loadImage(__dirname + `/profile_frames/${placement >= 4 ? 4 : placement}.png`)
  ctx.drawImage(playerHeadFrame, 0, 0, width, height)

  // Draw player head
  try {
      const response = await fetch(`https://mc-heads.net/avatar/${playerUUID}`);
      const buffer = await response.arrayBuffer();
      const img = await loadImage(Buffer.from(buffer));
      ctx.drawImage(img, width / 2 - 16, 28, 32, 32);
  } catch (err) {
      console.log("Error fetching image -- Background makes sure it's replaced with a checkerboard pattern.")
      console.error(err);
  }

  // -- Text Rendering --

  // Draw player name
  //  Measure player name pixel width with 18px size, if it does not fit scale down to 9px
  ctx.font = '18px Minecraft'
  if (ctx.measureText(playerName).width >= width - 4) ctx.font = '9px Minecraft'
  drawShadowText(ctx, playerName, width / 2, 15, "center")

  // Draw statistics
  ctx.font = 'bold 18px Minecraft';
  drawShadowText(ctx, potatoesCollected, width, 81, "right")
  drawColoredShadowText(ctx, `#${placement}`,
      placementColors[placement - 1] === undefined ? placementColors[placementLastIndex] : placementColors[placement - 1],
      placementShadowColors[placement - 1] === undefined ? placementShadowColors[placementLastIndex] : placementShadowColors[placement - 1],
      width, 102, "right");

  // Draw timestamp
  ctx.font = '9px Minecraft'
  drawShadowText(ctx, getFormattedDateList()[0], 1, 120)
  drawShadowText(ctx, getFormattedDateList()[1], 1, 126)

  // Get image buffer and save to file
  return canvas.toBuffer('image/png');
}

// Add commas to numbers (1000 -> 1,000)
function formatNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function drawColoredShadowText(ctx, text, color, shadowColor, x, y, alignment) {
  const textWidth = ctx.measureText(text).width;

  // Calculate the x position based on the alignment
  let posX;
  if (alignment === 'right') {
      posX = x - textWidth - 4;
  } else if (alignment === 'center') {
      posX = ctx.canvas.width / 2 - textWidth / 2;
  } else {
      // Default to left alignment
      posX = x;
  }

  // Draw shadow
  ctx.fillStyle = shadowColor;
  ctx.fillText(text, posX + 1, y + 1);

  // Draw text
  ctx.fillStyle = color;
  ctx.fillText(text, posX, y);
}

function drawShadowText(ctx, text, x, y, alignment) {
  drawColoredShadowText(ctx, text, 'white', '#545760', x, y, alignment)
}


// Returns a list containing the formatted date at index 0 and the formatted hour at index 1 (UTC)
function getFormattedDateList() {
  const now = new Date();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');
  const hours = String(now.getUTCHours()).padStart(2, '0');
  const minutes = String(now.getUTCMinutes()).padStart(2, '0');

  return [`${day}/${month}`, `${hours}:${minutes}`];
}

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
            const half_length = Math.floor(json[plotName].length / 2);
            if (json[plotName].slice(0,half_length).includes(req.body['point'])) {
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
        const cardImage = await generateImage({
          playerName: playersjson[uuid][0],
          placement: placement,
          potatoesCollected: playersjson[uuid].length - 1,
          playerUUID: uuid,
        });

        resp.set('Content-Type', 'image/png');
        resp.send(cardImage);
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
