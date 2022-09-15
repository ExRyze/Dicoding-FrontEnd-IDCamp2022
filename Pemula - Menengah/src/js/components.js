class animeCard extends HTMLElement {
  set datas(dataset) {
    this._dataset = dataset;
    this.create();
  }

  constructor() {
    super();
    this.addEventListener("click", function () {
      window.location.href = `index.html#anime:${this._dataset.id}`;
      location.reload();
    })
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
customElements.define("anime-info", animeinfo);

class navbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <nav class="navbar bg-primary px-5 d-flex justify-content-between align-items-center text-white mb-4">
      <a role="button" class="text-white d-flex text-decoration-none" onclick="window.location.href = 'index.html#'; location.reload();">
        <img src="img/logo_ex_red.png" alt="logo ex" height="50">
        <h2 class="h2 ms-4">Ex-BD</h2>
      </a>
      <div class="d-flex">
        <a role="button" class="text-white text-decoration-none" onclick="window.location.href = 'index.html#about'; location.reload();">
          About
        </a>
      </div>
    </nav>
    `;
  }
}
customElements.define("nav-bar", navbar);

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
customElements.define("footer-bar", footerbar);