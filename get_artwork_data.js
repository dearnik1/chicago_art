document.getElementById('fetch-button').onclick = () => {
    fetch('https://api.artic.edu/api/v1/artworks/4')
        .then(response => response.json())
        .then(data => {
            const title = data.data.title;
            const artist = data.data.artist_titles ? data.data.artist_titles[0] : 'Unknown Artist';
            const dateEnd = data.data.date_end;

            document.getElementById('output').textContent = `Title: ${title}\nArtist: ${artist}\nDate: ${dateEnd}`;
        })
        .catch(error => {
            document.getElementById('output').textContent = 'Error: ' + error;
        });
};