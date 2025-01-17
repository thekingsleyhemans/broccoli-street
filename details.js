// Assuming you have a JSON file named 'artData.json'
fetch('art-store.json')
  .then(response => response.json())
  .then(data => {
    // Get the ID from the URL (query string)
    const urlParams = new URLSearchParams(window.location.search);
    const artId = urlParams.get('id');

    // Check if the ID exists in the data
    const selectedArt = data.find(art => art.id == artId);

    if (selectedArt) {
      // If the art is found, dynamically populate the details page
      document.getElementById('art-details').innerHTML = `
        <div class="art-details-container">
          <div class="art-det-img"><img src="${selectedArt.image}" alt="${selectedArt.title}" class="art-image"></div>
          <div class="art-det-cont">
            <p class="s-art-title">${selectedArt.title}</p>
            <p class="s-art-desc">${selectedArt.description}</p>
            <div class="na-p">
              <p class="s-artist">Artist: ${selectedArt.artist}</p>
              <p class="s-price">Price: ${selectedArt.price}</p>
            </div>
            <div class="buy-wrap"><a href="${selectedArt.paymentLink}" class="buy-button">Buy Now</a></div>
          </div>
        </div>
      `;

      // Dynamically set the page title in the browser's title bar
      document.title = `${selectedArt.title} - Art Details`;
    } else {
      // If the art selection is invalid, show an error message
      document.getElementById('art-details').innerHTML = `
        <p>Invalid art selection. Please go back to the <a href="shop.html">shop</a>.</p>
      `;
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    document.getElementById('art-details').innerHTML = `
      <p>Something went wrong. Please try again later.</p>
    `;
  });

  ///mobile scripts


