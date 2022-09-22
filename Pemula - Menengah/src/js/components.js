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
    });
  }

  create() {
    this.innerHTML = `
    <div class="card card-body bg-white w-100 text-dark" role="button">
      <div class="d-flex overflow-hidden">
        <img src="${this._dataset.img_src}" class="col-5 col-sm-4 col-xxl-3 h-fit align-self-center">
        <div class="col-7 col-sm-8 col-xxl-9 ps-3 overflow-auto scrollbar-none align-self-stretch position-relative">
          <div class="sticky-top bg-white anime-card-header">
            <h5 class="h5 py-2 mb-0 mb-lg-1">${this._dataset.title}</h5>
            <div class="d-flex justify-content-between flex-wrap pb-2">
              <div class="d-flex type-season-year">
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
}

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
    this.addEventListener('click', function () {
      window.location.href = `#genre:${this._genreset.name}`;
      location.reload();
    });
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
        <p class="m-0">&copy; 2022 <a href="https://github.com/ExRyze" class="text-white text-decoration-none"><strong>ExRyze</strong></a> - <strong>IDCamp2022</strong> | All rights reserved</p>
      </div>
    </footer>
    `;
  }
}

customElements.define('nav-bar', navbar);
customElements.define('anime-card', animeCard);
customElements.define('anime-info', animeinfo);
customElements.define('anime-genre', animegenre);
customElements.define('footer-bar', footerbar);