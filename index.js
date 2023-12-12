import CharacterCard from "./components/CharacterCard/CharacterCard.js";
import NavButton from "./components/NavButton/NavButton.js";
import NavPagination from "./components/NavPagination/NavPagination.js";
import SearchBar from "./components/SearchBar/SearchBar.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const navigation = document.querySelector('[data-js="navigation"]');

// States
let maxPage;
let page = 1;
let searchQuery = "";

const pagination = NavPagination();

async function fetchCharacters() {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`
    );

    if (!response.ok) {
      throw new Error(`Network error: ${response.status}`);
    }

    const data = await response.json();
    maxPage = data.info.pages;
    const characters = data.results;
    pagination.textContent = `${page} / ${maxPage}`;
    cardContainer.innerHTML = "";
    characters.map(CharacterCard).forEach((card) => cardContainer.append(card));
  } catch (error) {
    console.error("Error fetching characters:", error.message);
    cardContainer.innerHTML = "<p>NO RESULTS!</p>";
    pagination.textContent = "0 / 0";
  }
}

fetchCharacters();

function backToTop() {
  document.querySelector("main").scrollTop = 0;
}

const prevButton = NavButton("prev", () => {
  if (page > 1) {
    page--;
    fetchCharacters();
  }
  backToTop();
});

const nextButton = NavButton("next", () => {
  if (page < maxPage) {
    page++;
    fetchCharacters();
  }
  backToTop();
});

const searchBar = SearchBar((event) => {
  event.preventDefault();
  searchQuery = event.target.elements.query.value;
  page = 1;
  fetchCharacters();
  backToTop();
});

searchBarContainer.append(searchBar);
navigation.append(prevButton, pagination, nextButton);
