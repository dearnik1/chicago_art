function fetchArtwork(artworkId, attempts = 0) {
    const maxAttempts = 10; // Set a limit on attempts
    // endpoint 1 - get a random artwork JSON
    fetch(`https://api.artic.edu/api/v1/artworks/${artworkId}`)
        .then(response => {
            if (!response.ok) {
                // If 404, generate a new artwork ID and fetch again
                if (attempts < maxAttempts) {
                    const newArtworkId = Math.floor(Math.random() * 10000); // Generate a random ID
                    return fetchArtwork(newArtworkId, attempts + 1); // Recursively call the function
                } else {
                    // If max attempts reached, show a message in the output
                    document.getElementById('output').textContent = 'Maximum attempts reached. No valid artwork found.';
                    document.getElementById('artwork-image').style.display = 'none'; // Hide image
                }
            } else {
                return response.json();
            }
        })
        .then(data => {
            const title = data.data.title;
            const artist = data.data.artist_titles ? data.data.artist_titles[0] : 'Unknown Artist';
            const dateEnd = data.data.date_end;
            const image_id = data.data.image_id;

            document.getElementById('output').textContent = `Title: ${title}\nArtist: ${artist}\nDate: ${dateEnd}`;

            // Set image source using the image_id
            if (image_id) {
                // endpoint 2 - get a specific image .jpg
                const imageUrl = `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`;
                console.log(imageUrl); // Log the image URL
                const artworkImage = document.getElementById('artwork-image');
                artworkImage.src = imageUrl;
                artworkImage.style.display = 'block'; // Show the image
            }
        })
        .catch(error => {
            document.getElementById('output').textContent = error;
            document.getElementById('artwork-image').style.display = 'none'; // Hide image if there's an error
        });
}

// Trigger fetch for a random artwork ID when the button is clicked
document.getElementById('fetch-button').onclick = () => {
    const initialArtworkId = Math.floor(Math.random() * 10000); // Generate a random ID
    fetchArtwork(initialArtworkId); // Start fetching artwork
};