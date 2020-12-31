import dataJson from "./data.json";

document.addEventListener("DOMContentLoaded", function () {
  const masonryEl = document.getElementById("masonry");
  const grid = document.getElementById("grid");
  const loader = document.getElementById("load");
  let showEl = "";

  function hideLoad() {
    grid.className = "grid";
    loader.className =
      "d-flex justify-content-center position-absolute top-50 start-50 translate-middle d-none";
  }

  function getData(data) {
    showEl += `
          <style>
            .grid-item img {
              width: 100%;
              object-fit: cover;
              object-position: center;
            }
          </style>
          <div class="grid-item col-sm-6 col-lg-3 mb-4">
            <img src="${data.img}" alt="${data.id}" loading="lazy">
          </div>
    `;
    masonryEl.innerHTML = showEl;
    setTimeout(() => {
      const msnry = new Masonry(grid, {
        itemSelector: ".grid-item",
        percentPosition: true,
        initLayout: false,
      });
      msnry.layout();
    }, 700);
  }

  function showData() {
    const fetchPromise = fetch(dataJson);
    fetchPromise
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((datas) => {
          getData(datas);
          hideLoad();
        });
      })
      .catch((err) => console.error(err));
  }
  showData();
});
