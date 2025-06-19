let fetchMovies =  async () => {
    let movieList = document.querySelector('.movie-list');
    await fetch('/home/media')
        .then(response => response.json())
        .then(data => {
            data.forEach(movie => {
                let movieItem = document.createElement('li');
                movieItem.textContent = `${movie.title} - ${movie.type}`;
                movieList.appendChild(movieItem);
            });
        })
        .catch(error => console.error('Error fetching movies:', error));
}

window.onload = () => {
    fetchMovies();
}