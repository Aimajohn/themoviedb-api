
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params:{
        api_key: '41f595b6e9a3306dcd645e1eab82f413'
    }
})
async function getTrendings(){
    const {data} = await api('/trending/movie/day') 

    const trendingSection = document.getElementById('trendingSection')
    const randomMovies = []
    data.results.forEach(movie => {
        const movieContainer = document.createElement('article');
        const imgRandomMovieContainer = document.createElement('div');
        const movieImg = document.createElement('img');
        const movieHeader = document.createElement('div');
        const tituloRandomMovie = document.createElement('h5');
        const imbdSpan = document.createElement('span');
        
        movieContainer.classList.add('movieContainer')
        imgRandomMovieContainer.classList.add('imgRandomMovieContainer')
        movieHeader.classList.add('movieHeader')
        tituloRandomMovie.classList.add('tituloRandomMovie')
        imbdSpan.classList.add('imbdSpan')

        imgRandomMovieContainer.append(movieImg)
        movieHeader.append(tituloRandomMovie,imbdSpan)
        movieContainer.append(imgRandomMovieContainer, movieHeader)

        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w342' + movie.poster_path)
        tituloRandomMovie.textContent = movie.title
        imbdSpan.textContent =  + (movie.vote_average == 0)?"IMBD No": `IMBD ${(Math.floor(movie.vote_average*10)/10).toFixed(1) }`

        randomMovies.push(movieContainer)
    });
    trendingSection.append(...randomMovies)
}

async function getCategories(){
    const {data} = await api('/genre/movie/list') 
    const buttons = []
    data.genres.forEach(genero => {
        const categoryButton = document.createElement('button')
        categoryButton.setAttribute('type', 'button')
        categoryButton.setAttribute('id', `genre-${genero.id}`)
        categoryButton.classList.add('categoryButton')
        categoryButton.textContent = genero.name
        buttons.push(categoryButton)
    })
    const categorySection = document.getElementById('categorySection')
    categorySection.append(...buttons)
}
getCategories()
getTrendings()
