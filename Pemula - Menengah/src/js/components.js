class navbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <nav class="navbar bg-primary px-5 d-flex justify-content-between align-items-center text-white mb-4">
      <a role="button" class="text-white d-flex align-items-center text-decoration-none" onclick="window.location.href = '#'; location.reload();">
        <img src="" alt="logo ex" class="logo" height="50">
        <h2 class="h2 ms-4">Ex-BD</h2>
      </a>
      <input type="text" class="search ms-4 me-2 rounded" placeholder="Title, Genre, ...">
      <input type="submit" class="search-submit btn bg-white text-dark me-auto" value="Search">
      <div>
        <a role="button" class="p-3 text-white text-decoration-none" onclick="window.location.href = '#rank'">Rank</a>
        <a role="button" class="p-3 text-white text-decoration-none" onclick="window.location.href = '#about'; location.reload();">
          About
        </a>
        <a role="button" class="p-3 text-white text-decoration-none profile" onclick="window.location.href = '#profile';location.reload();"></a>
      </div>
    </nav>
    `;
  }
}

class animeCard extends HTMLElement {
  set datas(dataset) {
    this._dataset = dataset;
    this.create();
  }

  constructor() {
    super();
    this.addEventListener('click', function () {
      window.location.href = `#anime:${this._dataset.id}`;
      location.reload();
    })
  }

  create() {
    this.innerHTML = `
    <div class="card card-body bg-white w-100 text-dark" role="button">
      <div class="d-flex overflow-hidden">
        <img src="${this._dataset.img_src}" class="col-md-3 col-4 h-fit align-self-center">
        <div class="col-md-9 col-8 ps-3 overflow-auto scrollbar-none align-self-stretch position-relative">
          <div class="sticky-top bg-white anime-card-header">
            <h3 class="h3 py-2">${this._dataset.title}</h3>
            <div class="d-flex justify-content-between pb-2">
              <div class="d-flex flex-wrap type-season-year">
                <p role="button" class="px-1 border-right-1 m-0 border-edge">${this._dataset.type}</p>
                <p role="button" class="px-1 border-right-1 m-0 border-edge">${this._dataset.season}</p>
                <p role="button" class="px-1 border-right-1 m-0 border-edge">${this._dataset.year}</p>
              </div>
              <h6 class="h6 m-0">Score: ${this._dataset.score}</h6>
            </div>
          </div>
          <p class="text-indent text-justify">${this._dataset.synopsis}</p>
        </div>
      </div>
    </div>
    `;
  }
};

class animeinfo extends HTMLElement {
  set titles(titleset) {
    this._title = titleset;
    this.create();
  }

  create() {
    this.innerHTML = `
    <p><strong>${this._title.type}:</strong> ${this._title.title}</p>
    `;
  }
}

class animegenre extends HTMLElement {
  set genres(genreset) {
    this._genreset = genreset;
    this.create();
  }

  constructor() {
    super();
    this.addEventListener("click", function () {
      window.location.href = `#genre:${this._genreset.name}`;
      location.reload();
    })
  }

  create() {
    this.innerHTML = `
    <button class="me-2 text-white btn bg-secondary">${this._genreset.name}</button>
    `;
  }
}

class footerbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <footer class="mt-4 bg-dark text-center text-white">
      <div class="container p-3">
        <h6 class="h6">Copyright</h6>
      </div>
    </footer>
    `;
  }
}

customElements.define("nav-bar", navbar);
customElements.define("anime-card", animeCard);
customElements.define("anime-info", animeinfo);
customElements.define("anime-genre", animegenre);
customElements.define("footer-bar", footerbar);