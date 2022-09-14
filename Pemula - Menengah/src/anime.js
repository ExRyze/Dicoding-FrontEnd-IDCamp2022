import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
import $ from "jquery";
import "./js/components.js";

async function getAnime() {
  try {
    let id = window.location.hash.substring(1);
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    const allAnime = await response.json();
    let {producers, licensors, studios, genres, titles} = allAnime.data;
    console.log(producers, licensors, studios, genres, titles);
    let cards = new Promise(function (resolve) {
      resolve(
        $(".anime-image").attr("src", allAnime.data.images.jpg.image_url),
        allAnime.data.titles.forEach(title => {
          const _title = document.createElement("anime-info")
          _title.titles = {
            type: title.type,
            title: title.title
          };
          $(".anime-titles").append(_title);
        }),
        producers.forEach(name => {
          const _name = document.createElement("anime-info")
          _name.titles = {
            type: "Producers",
            title: name.name
          };
          $(".anime-informs").append(_name);
        }),
        licensors.forEach(name => {
          const _name = document.createElement("anime-info")
          _name.titles = {
            type: "Licensors",
            title: name.name
          };
          $(".anime-informs").append(_name);
        }),
        studios.forEach(name => {
          const _name = document.createElement("anime-info")
          _name.titles = {
            type: "Studios",
            title: name.name
          };
          $(".anime-informs").append(_name);
        }),
        $(".anime-title").text(allAnime.data.title),
        $(".anime-score").text(allAnime.data.score),
        $(".anime-scored").text(allAnime.data.scored_by.toLocaleString('en-US')+" Users"),
        $(".anime-rank").text("#"+allAnime.data.rank.toLocaleString('en-US')),
        $(".anime-popularity").text("#"+allAnime.data.popularity.toLocaleString('en-US')),
        $(".anime-members").text(allAnime.data.members.toLocaleString('en-US')),
        $(".anime-type").text(allAnime.data.type),
        $(".anime-season").text(allAnime.data.season),
        $(".anime-year").text(allAnime.data.year),
        $(".anime-synopsis").text(allAnime.data.synopsis),
        $(".anime-background").text(allAnime.data.background)
      );
    });
    await cards;
  } catch (error) {
    console.log(error);
    // window.location.href = "404.html";
  }
}
getAnime();