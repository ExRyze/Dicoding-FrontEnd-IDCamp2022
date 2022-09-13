import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
import $ from "jquery";
import "./js/components.js";

async function getAnime() {
  try {
    let id = window.location.hash.substring(1);
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    const allAnime = await response.json();
    let cards = new Promise(function (resolve) {
      resolve(
        console.log(allAnime)
      );
    });
    await cards;
  } catch (error) {
    console.log(error);
  }
}
getAnime();