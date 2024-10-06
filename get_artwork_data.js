document.getElementById('fetch-button').onclick = () => {
    // endpoint 1 - get a random artwork JSON
    fetch('https://api.artic.edu/api/v1/artworks/4')
        .then(response => response.json())
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
            document.getElementById('output').textContent = 'Error: ' + error;
        });
};