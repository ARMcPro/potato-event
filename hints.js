const text = `

Slamdown::
-Easy:
Death Dealer Decathlon
Point Pursuit Path
Anvil Gold Hoarder
Sky's Majesty Dunk
-Medium:
Single Choice Champion
Archon's Triumph Unleashed
Pixie's Triple Triumph
-Hard:
Glory after the power
Twilight Victor Pinnacle
-Super Hard:
Courtside Transcendental Trebuchet 

Boat 2::
-Easy:
Hidden by water
Hidden by nature
Hidden in plain sight
Simple Victory
-Medium:
Victory worth celebrating
Sticky Situation
Hidden Vault
-Hard:
Victory beyond normal
Hidden higher
-Super Hard:
Victory Royale

Medieval Empire::
-Easy:
Peacefully expand your territory
Expand your army
Better together
Teamwork 
-Medium:
Modern Age
Threatening army
Expand your territory the other way
-Hard:
Industrial
Modern Soldier
-Super Hard:
Coal Empire

Caesium::
-Easy:
Double Century Coin Collector
Explosive Victory
Flag come back
Mr Burns Simulator
-Medium:
Berry Blast Master
Ambassador of the Electron’s Era
-Hard:
Obsidian’s addiction
Flag Run Glory
-Super Hard:
Roseate Era's Mysterious Patron

Rising Lava is Fun::
-Easy:
Your First Prey
Conqueror of the Lava’s lake
Life is expanding!  
Onlooker's Inferno Target
-Medium:
Create the point
Dual Deathstroke Destiny
Nidavellir’s creation
-Hard:
The most unlikely item in the game
All the chances are against me
-Super Hard:
Hot potato (too easy?)

Bedwars*::
-Easy:
Untimely death
One less for the Victory
Boundless Woodland 
Endless pain
-Medium:
Expensive Spud
Level up
It’s time to wake up
-Hard:
Omnipotent Ore Excavator
Harder than Rock
-Super Hard:
Efficient Saboteur

Bowsenal 2::
-Easy:
We win these
Shock Therapy 
Life Drained
Quite Shocking 
-Medium:
Among the many Relics 
Last Chance to kill
Marked for Death 
-Hard:
The Uninterrupted
One Shot
-Super Hard:
Grim Piercer

Deathrun Classic*::
-Easy:
Runner success
Soul Reaper
Overthrow Hades
Blasted 
-Medium:
Way too triggered
Omnia win
Run or hide or die?
-Hard:
Untouched Champion
There are babies in the Basament.... Quick! I have to save them
-Super Hard:
The Grassy run

BlockParty*::
-Easy:
Terrorist Feats
Platform Mastery Marvel
The most famous meme on the Internet
Third success
-Medium:
Champion over the Quartet
Melodic 
Doppelganger offense
-Hard:
Pentadic Success Sequence
Perseverance pays off 
-Super Hard:
_Jeb and... ? 

Trivia Murder Party*::
-Easy:
Password (un)Protected 
Runaways
Postmortal
Deathproof
-Medium:
Modern Day Houdini  
One Sided
Clairvoyant
Quiplash!
-Hard:
Gambling Addiction
Feels Good to Be A-Five
-Super Hard:
Designated Survivor

Word Bomb::
-Easy:
Alphabet Ace
It’s the name of the game
Speed Demon
Deca-Wordsmith
-Medium:
Anagram Achiever
Turtle Typist
Only love you will ever see
-Hard:
Vowel Virtuoso
Ascending Assembly
-Super Hard:
Greedy Overkill

Crossover*::
-Easy:
Sky High
Victory
This Isn’t sputt time
Sniper
-Medium:
So Below
Flawless
Juggernaut
-Hard:
Stolen Victory
You're Going Down Too
-Super Hard:
Against All Odds

Battle Box::
-Easy:
You're Winner!
Relentless Voter!
Murderous Intent.
I'm Leafing!
-Medium:
World Champion!
Undying Squadron
Stealth 100.
-Hard:
Ace Fighter.
The True Potatoes...
-Super Hard:
The Blade's Heir...

Deep Echo::
-Easy:
Potato Design
Anybody out there?
Desolation, all around
We were here
-Medium:
Christmas came late
Deep beneath the earth
Is this broken?
-Hard:
Gods and Kings
Free of Burden
-Super Hard:
A happy ending?

Bending arena::
-Easy:
Obstruction at Birthplace
Air Temple
Spirit Oasis 
Death Looking
-Medium:
Route Ender
Warm Looking 
Metropolitan Mirage
-Hard:
The Secret of the Fire
Twitter hit journey
-Super Hard:
Glorius despite difficulties

Randomly Generated Droids::
-Easy:
Hunt down an altered one.
Enter the water into the old world.
Negotiate a deal to end your hunger
End the life of an innocent
-Medium:
Defeat her.
Become one with the potato
Show your gluttony to the potato.
-Hard:
Prove Khaos wrong
Appreciate fast foods.
-Super Hard:
Defeat the world, altered by the influence

West::
-Easy:
Paycheck Time!
Good Samaritan
Advertise go Big
Less than 21
-Medium:
Bandit Buster
Salty Surprise
Ironman’s favorite meal
-Hard:
Saltcave's Secrets
Esteem Peak
-Super Hard:
Serving the West
Wretched West

Pixelfields::
-Easy:
Explosive Canvas
Decapitated owner
The waterfall is hiding my biggest secret
It seems easy in this way
-Medium:
Ouch, that hurt
24-Hour Spud?!
Questionable time
-Hard:
Chrono Destroyer
Arm  Designer
-Super Hard:
Oversize Potato
Calamity

Mob Master::
-Easy:
Upgrade Squad Sprint
For the King!
Forest Lurkers
Monster Slayer
-Medium:
Ascension Squad Achievement
Pro Gamer
Centurion's Challenge
-Hard:
Medieval conqueror
Massacre Marathon
-Super Hard:
Necromancer 


`.trim();

const tableBody = document.querySelector('#table-container tbody');

const lines = text.split('\n');
const filteredLines = lines.filter(line => line.trim() !== '');

let currentPlotName = '';
let hints = '';

filteredLines.forEach(line => {
  if (line.endsWith('::')) {
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

    currentPlotName = line.replace('::', '');
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