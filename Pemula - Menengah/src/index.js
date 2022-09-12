import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style/style.css";
import $ from "jquery";

$(".h1").text("Hellow");

class animeCard extends HTMLElement {
  connectedCallback() {
    this.src = this.getAttribute("src") || null;

    this.innerHTML = `
    <img src="${this.src}">
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
      card.setAttribute("src", anime.images.jpg.image_url);
      document.body.querySelector(".card-body").appendChild(card);
    });
  } catch (error) {
    console.log(error);
  }
}

getAnime();