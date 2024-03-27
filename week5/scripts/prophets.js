const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  // console.table(data.prophets);
  displayProphets(data.prophets);
}

getProphetData();

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let portrait = document.createElement('img');
    let details = document.createElement('p');

   
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    details.textContent = `${prophet.birthdate} ${prophet.death} ${prophet.lenght} ${prophet.order} ${prophet.birthplace} ${prophet.numofchildren}`;
    portrait.setAttribute('alt', `portrait of ${prophet.birthdate.birthdate} ${prophet.death} ${prophet.lenght} ${prophet.order} ${prophet.birthplace} ${prophet.numofchildren}`);
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);

    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

   
    card.appendChild(fullName);
    card.appendChild(portrait);
    card.appendChild(details);
    cards.appendChild(card);
  });
};