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

const xhr = new XMLHttpRequest();

xhr.onload = function () {
  const allAnime = JSON.parse(this.responseText);
  
  allAnime.data.forEach(anime => {
    const card = document.createElement("anime-card");
    card.setAttribute("src", anime.images.jpg.image_url);
    document.body.querySelector(".card-body").appendChild(card);
  });
};
 
xhr.onerror = function () {console.log('Ups something error');};

xhr.open('GET', 'https://api.jikan.moe/v4/anime');
xhr.send();
// xhr.setRequestHeader('Content-Type', 'application/json');
// xhr.setRequestHeader('X-Auth-Token', '12345');
 
// const book = {
//   id: 10,
//   title: 'Edensor',
//   author: 'Andrea Hirata',
// };
 
// xhr.send(JSON.stringify(book));