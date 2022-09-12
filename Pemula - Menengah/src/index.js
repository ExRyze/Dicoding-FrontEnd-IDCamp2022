import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style/style.css";
import $ from "jquery";

class animeCard extends HTMLElement {
  connectedCallback() {
    this.src = $(this).attr("src") || null;

    this.innerHTML = `
    <div class="card bg-secondary w-100" role="button">
      <div class="card-body">
        <img src="${this.src}" class="w-25">
      </div>
    </div>
    `;
  }
};
customElements.define("anime-card", animeCard);

async function getAnime() {
  try {
    const response = await fetch("https://api.jikan.moe/v4/anime");
    const allAnime = await response.json();
    allAnime.data.forEach(anime => {
      const card = document.createElement("anime-card");
      $(card).attr("src", anime.images.jpg.image_url);
      $(card).attr("class", "col-md-6 col-sm-12 d-flex p-2")
      $(".display").append(card);
    });
  } catch (error) {
    console.log(error);
  }
}

getAnime();