document.getElementById('fetch-button').onclick = () => {
    fetch('https://api.artic.edu/api/v1/artworks/4')
        .then(response => response.json())
        .then(data => {
            document.getElementById('output').textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            document.getElementById('output').textContent = 'Error: ' + error;
        });
};