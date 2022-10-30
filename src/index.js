
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params:{
        api_key: '41f595b6e9a3306dcd645e1eab82f413'
    }
})



searchButton.addEventListener('click', searchMovie)

function redondear(numero){
    if(numero == 0){
        return "IMBD No"
     }else{ 
        return `IMBD ${(Math.floor(numero*10)/10).toFixed(1) }`
    }
}

async function getTrendings(){
    const {data} = await api('/trending/movie/day') 
    console.log(data.results)
    const randomMovies = []
    const heroMovie = data.results[data.results.length-2]
    heroMovieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w500'+heroMovie.poster_path)
    heroMovieTitle.textContent = heroMovie.title
    heroMovieScore.textContent = redondear(heroMovie.vote_average)
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
        imbdSpan.textContent = redondear(movie.vote_average)

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
    categorySection.append(...buttons)
}

function searchMovie(){
    location.hash = '#search='
}
