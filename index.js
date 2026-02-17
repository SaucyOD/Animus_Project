const cardListEl = document.querySelector(".results__gallery")

async function Main() {
    const Jikan = await fetch(`https://api.jikan.moe/v4/anime${id}/full`)
    const data = await Jikan.json()

    console.log(data)
    cardListEl.innerHTML = data.map((anime) => animeHTML(anime)).join('')
}

Main()

function animeHTML(anime) {
    return `<div class="gallery__card">
                <div class="card__poster">
                    <img src="#" alt="Anime Poster"
                        class="anime__img">
                    <div class="card__rating">| R</div>
                </div>

                <div class="card__details">
                    <h3 class="card__title">Parasyte: The Maxim</h3>

                    <div class="card__stats">
                        <div><i class="fa-solid fa-star"></i> 8.33</div>
                        <div>#215 Ranking</div>
                    </div>
                </div>
            </div>`
}