document.addEventListener("DOMContentLoaded", () => {
    const shopGrid = document.getElementById("shop-grid");
    const searchBar = document.getElementById("search-bar");

    // Fetch the JSON file
    fetch("art-store.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            return response.json();
        })
        .then((data) => {
            // Initial render of all products
            renderShopGrid(data);

            // Real-time search functionality
            searchBar.addEventListener("input", () => {
                const query = searchBar.value.toLowerCase();
                const filteredData = data.filter(
                    (art) =>
                        art.title.toLowerCase().includes(query) ||
                        art.artist.toLowerCase().includes(query)
                );
                renderShopGrid(filteredData); // Re-render shop grid
            });
        })
        .catch((error) => console.error("Error fetching JSON data:", error));

    // Function to render shop grid dynamically
    function renderShopGrid(data) {
        shopGrid.innerHTML = ""; // Clear existing cards

        data.forEach((art) => {
            const card = document.createElement("div");
            card.classList.add("shop-card");

            card.innerHTML = `
          <div class="card-wrap">
            <div class="card-img">
              <img src="${art.image}" alt="${art.title}">
            </div>
            <div class="card-details">
              <div class="card-info">
                <p class="art-title">${art.title}</p>
                <p class="art-price">${art.price}</p>
              </div>
              <div class="artist-name">
                <p>${art.artist}</p>
              </div>
              <div class="card-buttons">
                <a href="${art.paymentLink}" class="buy" target="_blank">Buy Now</a>
                <a href="${art.learnMoreLink}" class="learn">Learn More</a>
              </div>
            </div>
          </div>
        `;
            shopGrid.appendChild(card);
        });

        if (data.length === 0) {
            shopGrid.innerHTML = `<p>No products found</p>`;
        }
    }
});
