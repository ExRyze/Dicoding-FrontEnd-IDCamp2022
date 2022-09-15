import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
import $ from "jquery";
import "./js/components.js";

const hash = window.location.hash;
if(hash.includes("#anime:")) {
  $("body").html(``);
  async function getAnime() {
    try {
      let id = hash.substring(7);
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      const allAnime = await response.json();
      let {producers, licensors, studios, genres, titles} = allAnime.data;
      $("body").html(`
      <nav-bar class="sticky-top"></nav-bar>
      <main class="container-fluid d-flex justify-content-center">
        <div class="col-md-10 col-12">
          <div class="card bg-light">
            <div class="card-header"><h4 class="h4 anime-title"></h4></div>
            <div class="card-body d-flex flex-wrap">
              <div class="col-4 d-flex flex-column justify-content-start align-items-center px-3">
                <img class="w-50 mx-auto anime-image mb-4">
                <div class="card w-100 mb-4">
                  <div class="card-body">
                    <div>
                      <h5 class="h5 border-bottom-1 border-edge pb-1">Titles</h5>
                      <div class="anime-titles">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card w-100 mb-4">
                  <div class="card-body">
                    <div>
                      <h5 class="h5 border-bottom-1 border-edge pb-1">Information</h5>
                      <div class="anime-informs">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-8 border-solid border-left-2 border-edge px-3">
                <div class="card mb-2">
                  <div class="card-body d-flex justify-content-center flex-wrap">
                    <div class="w-auto border-right-1 border-edge px-3 d-flex flex-column text-center">
                      <h6 class="h6">Score:</h6>
                      <h4 class="h4 anime-score text-secondary"></h4>
                      <h6 class="h6 anime-scored"></h6>
                    </div>
                    <div class="w-auto px-3 d-flex flex-column text-center">
                      <h6 class="h6">Rank:</h6>
                      <h4 class="h4 anime-rank text-secondary"></h4>
                    </div>
                    <div class="w-auto px-3 d-flex flex-column text-center">
                      <h6 class="h6">Popularity:</h6>
                      <h4 class="h4 anime-popularity text-secondary"></h4>
                    </div>
                    <div class="w-auto px-3 d-flex flex-column text-center">
                      <h6 class="h6">Members:</h6>
                      <h4 class="h4 anime-members text-secondary"></h4>
                    </div>
                  </div>
                </div>
                <div class="d-flex type-season-year flex-wrap mb-4">
                  
                </div>
                <div class="mb-4">
                  <h5 class="h5 pb-2 border-bottom-2 border-edge">Genres</h5>
                  <div class="anime-genres m-0 d-flex"></div>
                </div>
                <div class="mb-4">
                  <h5 class="h5 pb-2 border-bottom-2 border-edge">Description</h5>
                  <p class="text-justify text-indent anime-synopsis m-0"></p>
                </div>
                <div class="mb-4">
                  <h5 class="h5 pb-2 border-bottom-2 border-edge">Background</h5>
                  <p class="text-justify text-indent anime-background m-0"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer-bar></footer-bar>`);
      let cards = new Promise(function (resolve) {
        resolve(
          $(".anime-image").attr("src", allAnime.data.images.jpg.image_url),
          titles.forEach(title => {
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
          genres.forEach(genre => {
            const _genre = document.createElement("anime-genre")
            _genre.genres = {name: genre.name};
            $(".anime-genres").append(_genre);
          }),
          $(".anime-score").text(allAnime.data.score),
          $(".anime-scored").text(allAnime.data.scored_by.toLocaleString('en-US')+" Users"),
          $(".anime-rank").text("#"+allAnime.data.rank.toLocaleString('en-US')),
          $(".anime-popularity").text("#"+allAnime.data.popularity.toLocaleString('en-US')),
          $(".anime-members").text(allAnime.data.members.toLocaleString('en-US')),
          $(".type-season-year").html(`
          <a role="button" onclick="window.location.href='index.html#type:${allAnime.data.type}';location.reload();" class="text-decoration-none px-1 border-right-1 border-edge">${allAnime.data.type}</a>
          <a role="button" onclick="window.location.href='index.html#season:${allAnime.data.season}';location.reload();" class="text-decoration-none px-1 border-right-1 border-edge">${allAnime.data.season}</a>
          <a role="button" onclick="window.location.href='index.html#year:${allAnime.data.year}';location.reload();" class="text-decoration-none px-1 border-right-1 border-edge">${allAnime.data.year}</a>`),
          $(".anime-synopsis").text(allAnime.data.synopsis),
          $(".anime-background").text(allAnime.data.background),
          // $("a.anime-year").setAttribute("onclick", `window.location.href='index.html#season:${allAnime.data.year}';location.reload();`)
        );
      });
      await cards;
    } catch (error) {
      window.location.href = "index.html#";
      location.reload();
    }
  };
  getAnime();
} else if (hash.includes("#genre:")) {
  async function getAnimeByGenre() {
    try {
      let genre = hash.substring(7).replace(/%20/g, " ");
      if(genre.includes(",")) {genre = genre.split(",");}
      else {genre = [genre]}
      $(".anime-header .h4").text(`Genre - ${genre.join(", ")}`);
      const response = await fetch("https://api.jikan.moe/v4/anime");
      const allAnime = await response.json();
      let animeByGenre = [];
      allAnime.data.forEach(anime => {
        anime.genres.forEach(genres => {
          genre.forEach(_genre => {
            if(genres.name === _genre) {
              if(!animeByGenre.includes(anime)) {
                animeByGenre.push(anime);
              }
            }
          })
        })
      })
      let cards = new Promise(function (resolve) {
        resolve(
          animeByGenre.forEach(anime => {
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
  getAnimeByGenre();
} else if (hash.includes("#season:")) {
  async function getAnimeByseason() {
    try {
      let season = hash.substring(8).replace(/%20/g, " ");
      if(season.includes(",")) {season = season.split(",");}
      else {season = [season]};
      $(".anime-header .h4").text(`Season - ${season.join(", ")}`);
      const response = await fetch("https://api.jikan.moe/v4/anime");
      const allAnime = await response.json();
      let animeByseason = [];
      allAnime.data.forEach(anime => {
        season.forEach(_season => {
          if(anime.season === _season) {
            if(!animeByseason.includes(anime)) {
              animeByseason.push(anime);
            }
          }
        })
      })
      let cards = new Promise(function (resolve) {
        resolve(
          animeByseason.forEach(anime => {
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
  getAnimeByseason();
} else if (hash.includes("#type:")) {
  async function getAnimeBytype() {
    try {
      let type = hash.substring(6).replace(/%20/g, " ");
      if(type.includes(",")) {type = type.split(",");}
      else {type = [type]};
      $(".anime-header .h4").text(`Type - ${type.join(", ")}`);
      const response = await fetch("https://api.jikan.moe/v4/anime");
      const allAnime = await response.json();
      let animeBytype = [];
      allAnime.data.forEach(anime => {
        type.forEach(_type => {
          if(anime.type === _type) {
            if(!animeBytype.includes(anime)) {
              animeBytype.push(anime);
            }
          }
        })
      })
      let cards = new Promise(function (resolve) {
        resolve(
          animeBytype.forEach(anime => {
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
  getAnimeBytype();
} else if (hash.includes("#year:")) {
  async function getAnimeByyear() {
    try {
      let year = hash.substring(6);
      if(year.includes(",")) {year = year.split(",");}
      else {year = [year]};
      $(".anime-header .h4").text(`Year - ${year.join(", ")}`);
      const response = await fetch("https://api.jikan.moe/v4/anime");
      const allAnime = await response.json();
      let animeByyear = [];
      allAnime.data.forEach(anime => {
        year.forEach(_year => {
          console.log(anime.year);
          console.log(_year);
          if(anime.year === parseInt(_year)) {
            console.log("anime");
            if(!animeByyear.includes(anime)) {
              animeByyear.push(anime);
            }
          }
        })
      })
      let cards = new Promise(function (resolve) {
        resolve(
          animeByyear.forEach(anime => {
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
  getAnimeByyear();
} else if (hash === "#about") {
  $("body").html(`
  <nav-bar class="sticky-top"></nav-bar>
  <main class="container-fluid d-flex justify-content-center">
  </main>
  <footer-bar></footer-bar>`);
} else {
  async function getAnime() {
    try {
      $(".anime-header .h4").text(`Dashboard - List Anim.join(", ")e`);
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
}
