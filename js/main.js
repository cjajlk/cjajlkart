
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".gallery-grid");
  const filters = document.querySelectorAll("[data-filter]");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = document.querySelector(".lightbox img");
  const lightboxCaption = document.querySelector(".lightbox-caption");

  function renderGallery(category="all") {
    grid.innerHTML = "";
    artworks
      .filter(a => category === "all" || a.category === category)
      .forEach(art => {
        const card = document.createElement("article");
        card.className = "art-card";
        card.innerHTML = `
          <div class="art-thumb">
            <img src="gallery/${art.file}" alt="${art.title}">
          </div>
          <div class="art-info">
            <h3>${art.title}</h3>
            <p class="art-category">${art.category}</p>
            <p class="art-desc">${art.description}</p>
          </div>
        `;
        card.querySelector("img").addEventListener("click", () => {
          lightbox.classList.add("open");
          lightboxImg.src = "gallery/" + art.file;
          lightboxImg.alt = art.title;
          lightboxCaption.textContent = art.title + " — " + art.description;
        });
        grid.appendChild(card);
      });
  }

  filters.forEach(btn => {
    btn.addEventListener("click", () => {
      filters.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderGallery(btn.dataset.filter);
    });
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.classList.contains("lightbox-close")) {
      lightbox.classList.remove("open");
    }
  });

  renderGallery();
});
