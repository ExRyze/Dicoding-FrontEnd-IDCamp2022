import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style/style.css";
import $ from "jquery";

class animeCard extends HTMLElement {
  set datas(dataset) {
    this._dataset = dataset;
    this.create();
  }

  create() {
    this.innerHTML = `
    <div class="card bg-secondary w-100 text-white" role="button">
      <div class="card-body d-flex">
        <img src="${this._dataset.img_src}" class="col-md-3 col-4">
        <div class="col-md-9 col-8 ps-3 d-flex flex-column">
          <h3 class="h3">${this._dataset.title}</h3>
          <h6 class="h6">Score: ${this._dataset.score}<h6>
        </div>
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
    let cards = new Promise(function (resolve) {
      resolve(
        allAnime.data.forEach(anime => {
          const card = document.createElement("anime-card");
          $(card).attr("class", "col-md-6 col-sm-12 d-flex p-2")
          card.datas = {
            img_src: anime.images.jpg.image_url,
            title: anime.title,
            score: anime.score
          };
          $(".display").append(card);
        })
      );
    });
    await cards;
  } catch (error) {
    console.log(error);
  }
}

getAnime();