class animeCard extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("click", function () {
      window.location.href = "about.html";
    })
  }

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

class navbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <nav class="navbar bg-primary px-5 d-flex justify-content-between align-items-center text-white mb-4">
    <a href="index.html" class="text-white d-flex text-decoration-none">
      <img src="img/logo_ex_red.png" alt="logo ex" height="50">
      <h2 class="h2">Ex-BD</h2>
    </a>
    <div class="d-flex">
      <a href="about.html" class="text-white text-decoration-none">
        About
      </a>
    </div>
  </nav>
  `;
  }
}
customElements.define("nav-bar", navbar);