const cardListEl = document.querySelector(".results__gallery");
const searchInput = document.querySelector('.search-bar__input');
const searchSubtitle = document.getElementById("search-query");

searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        const query = event.target.value

        searchSubtitle.innerHTML = `"${query}"`

        renderAnime(query)
    }
})

async function renderAnime(searchQuery) {
    cardListEl.classList.add("anime__loading");

    let apiUrl = `https://api.jikan.moe/v4/top/anime`

    if (searchQuery) {
        apiUrl = `https://api.jikan.moe/v4/anime?q=${searchQuery}`
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    cardListEl.classList.remove("anime__loading");

    const animeArray = data.data;
    cardListEl.innerHTML = animeArray.map(anime => animeHTML(anime)).join('');
}

renderAnime();

function animeHTML(anime) {
    return `<div class="gallery__card">
                <div class="card__poster">
                    <img src="${anime.images.jpg.image_url}" alt="Anime Poster"
                        class="anime__img">
                    <div class="card__rating">${anime.rating ? anime.rating.split(' ')[0] : 'N/A'}</div>
                </div>

                <div class="card__details">

                    <h3 class="card__title">${anime.title}</h3>

                    <div class="card__stats">
                        <div><i class="fa-solid fa-star"></i>${anime.score}</div>
                        <div>#${anime.rank}</div>
                    </div>
                </div>
            </div>`
}

function openFilter() {
    document.querySelector(".filter-btn").classList.add("filter--open")
}

function closeFilter() {
    document.querySelector(".filter-btn").classList.remove("filter--open")
}