const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const characterCards = document.getElementById('characterCards');
const characterModal = document.getElementById('characterModal');
const modalContent = document.getElementById('modalContent');

async function fetchCharacters(searchQuery) {
  const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${searchQuery}`);
  const data = await response.json();
  return data.results;
}

function displayCharacters(characters) {
  characterCards.innerHTML = '';

  characters.forEach(character => {
    const card = document.createElement('div');
    card.className = 'character-card';
    card.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <h2>${character.name}</h2>`;
    card.addEventListener('click', () => openCharacterModal(character));
    characterCards.appendChild(card);
  });
}

function openCharacterModal(character) {
  modalContent.innerHTML = `
    <h2>${character.name}</h2>
    <img src="${character.image}" alt="${character.name}">
    <p>Status: ${character.status}</p>
    <p>Species: ${character.species}</p>
    <p>Origin: ${character.origin.name}</p>
  `;

  characterModal.style.display = 'flex';
}

searchButton.addEventListener('click', async () => {
  const searchQuery = searchInput.value.trim();
  if (searchQuery === '') return;

  const characters = await fetchCharacters(searchQuery);
  displayCharacters(characters);
});

characterModal.addEventListener('click', event => {
  if (event.target === characterModal) {
    characterModal.style.display = 'none';
  }
});