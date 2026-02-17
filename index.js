const cardListEl = document.querySelector(".results__gallery");
const searchInput = document.querySelector('.search-bar__input');
const searchSubtitle = document.getElementById("search-query");

let currentSearch = "";
let currentSort = "";
let currentFilter = "";

const urlParams = new URLSearchParams(window.location.search);
const homeQuery = urlParams.get('query');

if (homeQuery) {
    currentSearch = homeQuery;
    searchInput.value = homeQuery;
    searchSubtitle.innerHTML = `"${currentSearch}"`;
}

// Search Bar
searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        currentSearch = event.target.value
        searchSubtitle.innerHTML = `"${currentSearch}"`
        renderAnime()
    }
})

// API FUNCTION
async function renderAnime() {
    cardListEl.classList.add("anime__loading");
    cardListEl.innerHTML = `<i class="fa-solid fa-spinner anime__loading--spinner"></i>`;

    let apiUrl = `https://api.jikan.moe/v4/top/anime`

    if (currentSearch || currentSort || currentFilter) {
        apiUrl = `https://api.jikan.moe/v4/anime?sfw=true`;

        if (currentSearch) apiUrl += `&q=${currentSearch}`;
        if (currentFilter) apiUrl += `&type=${currentFilter}`;
        if (currentSort) {
            let direction = currentSort === 'rank' ? 'asc' : 'desc';
            apiUrl += `&order_by=${currentSort}&sort=${direction}`;
        } else if (currentSearch) {
            apiUrl += `&order_by=members&sort=desc`;
        }
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();  

        cardListEl.classList.remove("anime__loading");
        const animeArray = data.data;
        
        if (animeArray && animeArray.length > 0) {
            cardListEl.innerHTML = animeArray.map(anime => animeHTML(anime)).join('');
        } else {
            cardListEl.innerHTML = `<div class="error__state">
            <i class="fa-solid fa-ghost error__icon"></i>
            <h3>No anime found in this universe.</h3></div>`;
        }
    } catch (error) {
        console.error("API Error:", error);
        cardListEl.classList.remove("anime__loading")
        cardListEl.innerHTML = "Failed to load data."
    }
}

// Apply Functions
function applySort(sortParameter, displayWord) {
    currentSort = sortParameter
    document.getElementById("sort-btn-text").innerHTML = `<i class="fa-solid fa-sort"></i> Sort: ${displayWord}`
    closeSort()
    renderAnime()
}

function applyFilter(filterParameter, displayWord) {
    currentFilter = filterParameter
    document.getElementById("filter-btn-text").innerHTML = `<i class="fa-solid fa-filter"></i> Filter: ${displayWord}`;
    closeFilter()
    renderAnime()
}


// Modal Toggles
function openFilter() {
    document.getElementById("filter-modal").classList.add("filter--open")
}

function closeFilter() {
    document.getElementById("filter-modal").classList.remove("filter--open")
}

function openSort() {
    document.getElementById("sort-modal").classList.add("filter--open")
}

function closeSort() {
    document.getElementById("sort-modal").classList.remove("filter--open")
}

// HTML Card Template
function animeHTML(anime) {
    return `<a href="${anime.url}" target="_blank" class="gallery__card" style="text-decoration: none; color: inherit;">
                <div class="card__poster">
                    <img src="${anime.images.jpg.image_url}" alt="Anime Poster"
                        class="anime__img">
                    <div class="card__rating">${anime.rating ? anime.rating.split(' ')[0] : 'N/A'}</div>
                </div>

                <div class="card__details">

                    <div class="card__status">${anime.status}</div>

                    <h3 class="card__title">${anime.title}</h3>

                    <div class="card__stats">
                        <div><i class="fa-solid fa-star"></i>${anime.score ? anime.score : "N/A"}</div>
                        <div>#<span class="rank">${anime.rank ? anime.rank : "N/A"}</span><br>Ranking</div>
                        <div class="card__genres">${anime.genres.slice(0, 3).map(genre => `<span class="genre">${genre.name}</span>`).join('')}</div>
                    </div>
                </div>
            </div>`
}

renderAnime()