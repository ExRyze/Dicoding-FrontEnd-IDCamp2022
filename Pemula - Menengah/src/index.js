import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
import $ from "jquery";
import "./js/components.js";

class Anime {
  constructor() {
    const hash = window.location.hash;
    const localKey = "Ex-BD";
    let profile = this.getProfile(localKey);
    if(hash.includes("#anime:")) {
      $("main").html("")
      this.getDataAnime(`/${hash.substring(7)}`, profile, localKey);
    } else if(hash.includes("#genre:")) {
      let genre = hash.substring(7).replace(/%20/g, " ");
      if(genre.includes(", ")) {genre = genre.split(", ");}
      else {genre = [genre]};
      this.getAllAnimeBy(genre, hash.slice(1, 6), profile.list);
    } else if(hash.includes("#type:")) {
      let type = hash.substring(6).replace(/%20/g, " ");
      if(type.includes(", ")) {type = type.split(", ");}
      else {type = [type]};
      this.getAllAnimeBy(type, hash.slice(1, 5), profile.list);
    } else if(hash.includes("#season:")) {
      let season = hash.substring(8).replace(/%20/g, " ");
      if(season.includes(", ")) {season = season.split(", ");}
      else {season = [season]};
      this.getAllAnimeBy(season, hash.slice(1, 7), profile.list);
    } else if(hash.includes("#year:")) {
      let year = hash.substring(6).replace(/%20/g, " ");
      if(year.includes(", ")) {year = year.split(", ");}
      else {year = [year]};
      this.getAllAnimeBy(year, hash.slice(1, 5), profile.list);
    } else if(hash.includes("#search:")) {
      let vals = hash.substring(8).replace(/%20/g, " ");
      if(vals.includes(", ")) {vals = vals.split(", ");}
      else {vals = [vals]};
      this.search(profile.list, vals, hash.slice(1, 7),);
    } else if(hash === "#profile") {
      this.setProfile(profile, localKey);
    } else if(hash === "#about") {
      this.about();
    } else {
      this.getAllAnime(profile.list);
    }
    document.querySelector(".search-submit").addEventListener("click", () => {
      window.location.href = `index.html#search:${$(".search").val()}`; location.reload();
    })
  }

  async fetch(id = "") {
    const response = await fetch(`https://api.jikan.moe/v4/anime${id}`);
    return response.json();
  }

  async search(list, vals, key) {
    try {
      const allAnime = await this.fetch();
      this.cardsBySearch(list, allAnime.data, key, vals);
      $(".search").val(vals.join(", "))
    } catch(error) {
      console.log(error);
    }
  }

  async getAllAnime(list) {
    try {
      const allAnime = await this.fetch();
      this.cards(list, allAnime.data);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllAnimeBy(any, key, list) {
    try {
      const allAnime = await this.fetch();
      let animeBy = [];
      if(key === "genre") {animeBy = this.Genre(allAnime, any);} 
      else if (key === "type") {animeBy = this.Type(allAnime, any);}
      else if (key === "season") {animeBy = this.Season(allAnime, any);}
      else if (key === "year") {animeBy = this.Year(allAnime, any);}
      else if (key === "profile") {animeBy = this.Favorite(allAnime, any);}
      this.cards(list, animeBy, key, any);
    } catch (error) {
      console.log(error);
    }
  }

  async getDataAnime(id, profile, key) {
    try {
      const anime = await this.fetch(id);
      let {producers, licensors, studios, genres, titles} = anime.data;
      const names = [
        {title: "Producers", name: this.forName(producers)}, 
        {title: "Licensors", name: this.forName(licensors)}, 
        {title: "Studios", name: this.forName(studios)}
      ];
      $("main").html(`
        <div class="col-md-10 col-12">
          <div class="card bg-light">
            <div class="card-header d-flex justify-content-between align-items-center"><h4 class="h4 anime-title"></h4><img role="button" src="img/star-white.png" class="h-fit fav" width="30"></div>
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
        </div>`);
      this.addFav(profile, id.slice(1), key);
      this.checkFavData(profile.list, id.slice(1));
      let cards = new Promise(function (resolve) {
        resolve(
          $(".anime-title").text(anime.data.title),
          $(".anime-image").attr("src", anime.data.images.jpg.image_url),
          titles.forEach(title => {
            const _title = document.createElement("anime-info")
            _title.titles = {
              type: title.type,
              title: title.title
            };
            $(".anime-titles").append(_title);
          }),
          names.forEach(name => {
            const _name = document.createElement("anime-info")
            _name.titles = {
              type: name.title,
              title: name.name
            };
            $(".anime-informs").append(_name);
          }),
          genres.forEach(genre => {
            const _genre = document.createElement("anime-genre")
            _genre.genres = {name: genre.name};
            $(".anime-genres").append(_genre);
          }),
          $(".anime-score").text(anime.data.score),
          $(".anime-scored").text(anime.data.scored_by.toLocaleString('en-US')+" Users"),
          $(".anime-rank").text("#"+anime.data.rank.toLocaleString('en-US')),
          $(".anime-popularity").text("#"+anime.data.popularity.toLocaleString('en-US')),
          $(".anime-members").text(anime.data.members.toLocaleString('en-US')),
          $(".type-season-year").html(`
          <a role="button" onclick="window.location.href='index.html#type:${anime.data.type}';location.reload();" class="text-secondary text-decoration-none px-1 border-right-1 border-edge">${anime.data.type}</a>
          <a role="button" onclick="window.location.href='index.html#season:${anime.data.season}';location.reload();" class="text-secondary text-decoration-none px-1 border-right-1 border-edge">${anime.data.season}</a>
          <a role="button" onclick="window.location.href='index.html#year:${anime.data.year}';location.reload();" class="text-secondary text-decoration-none px-1 border-right-1 border-edge">${anime.data.year}</a>`),
          $(".anime-synopsis").text(anime.data.synopsis),
          $(".anime-background").text(anime.data.background),
        );
      });
      await cards;
    } catch (error) {
      console.log(error);
      // window.location.href = "index.html#";
      // location.reload();
    }
  }

  cardsBySearch(list, dataAnime, key = "Dashboard", any = ['']) {
    let _allAnime = [];
    dataAnime.forEach(anime => {
      any.forEach(_any => {
        if((anime.title || '').toLowerCase().includes(_any.toLowerCase()) || (anime.type || '').toLowerCase().includes(_any.toLowerCase()) || (anime.season || '').toLowerCase().includes(_any.toLowerCase()) || (`${anime.year}` || '').toLowerCase().includes(_any.toLowerCase())) {
          if(!_allAnime.includes(anime)) {
            _allAnime.push(anime);
          }
        }
        anime.genres.forEach(_genre => {
          if((_genre.name || '').toLowerCase().includes(_any.toLowerCase())) {
            if(!_allAnime.includes(anime)) {
              _allAnime.push(anime);
            }
          }
        })
      })
    })
    console.log(_allAnime)
    this.cards(list, _allAnime, key, any)
  }

  cards(list, dataAnime, key = "Dashboard", any = ["List Anime"]) {
    new Promise(function (resolve) {
      resolve(
        $(".anime-header .h4").text(`${key} - ${any.join(", ")}`),
        dataAnime.forEach(anime => {
          const card = document.createElement("anime-card");
          $(card).attr("class", "col-md-6 col-sm-12 d-flex p-2");
          $(card).attr("id", anime.mal_id);
          card.datas = {
            id: anime.mal_id,
            img_src: anime.images.jpg.image_url,
            title: anime.title,
            type: anime.type,
            season: anime.season,
            year: anime.year,
            score: anime.score,
            synopsis: anime.synopsis
          };
          $(".display").append(card);
        }),
      );
    });
    this.checkFavList(list);
    if(key === "profile") {$(".anime-header .h4").text(`${key} - Favorites`);}
  }
  
  getProfile(key) {
    let profile;
    if (typeof(Storage) !== 'undefined') {
      if (localStorage.getItem(key) === null) {
        const initProfile = {
          name: "lilgru",
          password: "Hmmm",
          address: "I dont know where you live, sorry...",
          list: []
        }
        localStorage.setItem(key, JSON.stringify(initProfile))
      }
      profile = JSON.parse(localStorage.getItem(key));
    }
    $("nav-bar .profile").html(`
    ${(profile.name || '')}
    <img src="img/lilgru.jpg" height="30" class="ms-2 rounded-circle">
    `)
    return profile;
  }

  async setProfile(profile, key) {
    try {
      $(`
      <div class="col-md-10 col-12 mb-4">
        <div class="card bg-white">
          <div class="card-header anime-header"><h4 class="h4 text-capitalize">My Profile</h4></div>
          <div class="card-body d-flex flex-wrap">
            <div class="col-4 d-flex justify-content-center">
              <img src="img/lilgru.jpg" class="w-50 h-fit p-4 border-5 border-edge rounded-circle">
            </div>
            <div class="col-8 d-flex flex-column">
              <label for="Username"><h6 class="h6 mb-0 mt-1">Username:</h6></label>
              <input name="Username" type="text" class="mb-2 rounded username" value="${(profile.name || '')}">
              <label for="Password"><h6 class="h6 mb-0 mt-1">Password:</h6></label>
              <input name="Password" type="password" class="mb-2 rounded password" value="${(profile.password || '')}">
              <label for="Address"><h6 class="h6 mb-0 mt-1">Address:</h6></label>
              <input name="Address" type="text" class="mb-2 rounded address" value="${(profile.address || '')}">
              <input type="submit" class="update-profile btn bg-secondary text-white ms-auto" value="Update">
            </div>
          </div>
        </div>
      </div>
      `).insertBefore($(".list"));
      document.querySelector(".update-profile").addEventListener("click", () => {
        this.updateProfile(profile, key);
      })
      this.getAllAnimeBy(profile.list, "profile", profile.list)
    } catch(error) {
      console.log(error);
    }
  }

  updateProfile(profile, key) {
    let name = $(".username").val();
    let pass = $(".password").val();
    let addr = $(".address").val();
    profile.name = name;
    profile.password = pass;
    profile.address = addr;
    localStorage.setItem(key, JSON.stringify(profile));
    location.reload();
  }

  addFav(profile, id, key) {
    document.querySelector(".card-header .fav").addEventListener("click", () => {
      if((profile.list).includes(id)) {
        profile.list = (profile.list).filter(item => !id.includes(item));
      } else {
        (profile.list).push(id);
        (profile.list).sort(function(a, b){return a - b});
      }
      localStorage.setItem(key, JSON.stringify(profile));
      this.checkFavData(profile.list, id)
    })
  }

  checkFavList(list) {
    $("anime-card").each((index) => {
      if(list.includes($("anime-card")[index].id)){
        $("anime-card")[index].querySelector(".card.card-body").classList.add("bg-warning");
        $("anime-card")[index].querySelector(".card.card-body").classList.remove("bg-white");
        $("anime-card")[index].querySelector(".anime-card-header").classList.add("bg-warning");
        $("anime-card")[index].querySelector(".anime-card-header").classList.remove("bg-white");
      }
    })
  }

  checkFavData(list, _id) {
    if(list.includes(_id)) {
      $(".card-header .fav").attr("src", "img/star-yellow.png");
    } else {
      $(".card-header .fav").attr("src", "img/star-white.png");
    }
  }

  about() {
  $("main").html(``);
  }

  forName(dataset) {
    let result = [];
    dataset.forEach(data => {
      result.push(data.name)
    });
    return result.join(", ");
  }

  Genre(allAnime, _genre) {
    let animeBy = [];
    allAnime.data.forEach(anime => {
      anime.genres.forEach(genre => {
        _genre.forEach(_genre => {
          if((genre.name || '').toLowerCase().includes(_genre.toLowerCase())) {
            if(!animeBy.includes(anime)) {
              animeBy.push(anime);
            }
          }
        })
      })
    })
    return animeBy;
  }

  Season(allAnime, _season) {
    let animeBy = [];
    allAnime.data.forEach(anime => {
      _season.forEach(_season => {
        if((anime.season || '').toLowerCase().includes(_season.toLowerCase())) {
          if(!animeBy.includes(anime)) {
            animeBy.push(anime);
          }
        }
      })
    })
    return animeBy;
  }

  Type(allAnime, _type) {
    let animeBy = [];
    allAnime.data.forEach(anime => {
      _type.forEach(_type => {
        if((anime.type || '').toLowerCase().includes(_type.toLowerCase())) {
          if(!animeBy.includes(anime)) {
            animeBy.push(anime);
          }
        }
      })
    })
    return animeBy;
  }

  Year(allAnime, _year) {
    let animeBy = [];
    allAnime.data.forEach(anime => {
      _year.forEach(_year => {
        if((`${anime.year}` || '').toLowerCase().includes(_year.toLowerCase())) {
          if(!animeBy.includes(anime)) {
            animeBy.push(anime);
          }
        }
      })
    })
    return animeBy;
  }

  Favorite(allAnime, _list) {
    let animeBy = [];
    allAnime.data.forEach(anime => {
      _list.forEach(_list => {
        if((`${_list}`).toLowerCase().includes(`${anime.mal_id}`.toLowerCase())) {
          if(!animeBy.includes(anime)) {
            animeBy.push(anime);
          }
        }
      })
    })
    return animeBy;
  }

}
new Anime();