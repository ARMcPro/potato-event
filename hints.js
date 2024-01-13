const text = `

Dodgeball (42424):
Go shopping
Touch Grass
[Secret Hint]
Decapitate Jere
Mudkip lost his head

DFSmash (42457):
[Secret Hint]
Ouch, too many!   
Burning Sam 
Again Sam?! 
Looking from afar

Chat Vs Verified (43055):
GG   
Literally what you have to do  
It’s hot
[Secret Hint]

Sky battle (42423):
Amazing  
[Secret Hint]
Try again!
Skill Issue   
Close enough to a weapon  

Among Sus (42258):
Old but Gold! 
I am way too Sus
[Secret Hint]
“And I Would Have Gotten Away With It Too, If It Weren't For You Meddling Kids"     
An imposter cloned himself?!

Minerware (21902):
Epic   
Veni Vidi Vici (Julius Caesar) 
Persistence pays off

Vulcan (62909):
The philosopher's stone	
Where are the others?   
[Secret Hint]
"It is not more surprising to be born twice than once” 
Cool T-Shirt!

Party (42106):
[Found in-game]

Freeze Tag (70964):
Meme
Epic creator of the event
Epic owner  
Sus!    

Missile wars (42228):
We are so good!  
I finally got that chest!	
Oh, cool, where has this been all the time?	
So far

Tower defense (70431):
Be a pro
Be a pro
Be a pro
[Secret Hint]
I feel like the waterfall knows my secret!

Lava escape 2 (38487):
“Art is not what you see but what you make other see”
Practice is needed to become a pro player
[Secret Hint]
London's bridge is falling down, falling down….
Train is coming!

Combustion (21494):
Set my heart on fire!
Close call
I got my revenge!
[Secret Hint]
Am I stupid?

Menaces (41800):
Slabs are so tricky
I have never noticed this during my training lessons!
[Secret Hint]
Menaces to Society
That copper block is surely hiding my biggest secret.

Murder game (60425):
Elementary, my dear Watson!
Betrayal!
[Secret Hint]
Devilish deeds
Prescribe justice

Chorus virus (50029):
[Found in-game]

`.trim();

const tableBody = document.querySelector('#myTable tbody');

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