import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
import $ from "jquery";
import "./js/components.js";

async function getAnime() {
  try {
    const response = await fetch("https://api.jikan.moe/v4/anime");
    const allAnime = await response.json();
    let cards = new Promise(function (resolve) {
      resolve(
        allAnime.data.forEach(anime => {
          const card = document.createElement("anime-card");
          $(card).attr("class", "col-md-6 col-sm-12 d-flex p-2");
          card.datas = {
            id: anime.mal_id,
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