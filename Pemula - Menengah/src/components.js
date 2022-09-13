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