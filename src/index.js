
// Header functions


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params:{
        api_key: '41f595b6e9a3306dcd645e1eab82f413'
    }
})

backButton.addEventListener('click', ()=>{
    window.scrollTo(0,0)
    location.hash = window.history.back()
})
searchButton.addEventListener('click', searchMovie)
searchInput.addEventListener('keydown', (event)=>(event.key == 'Enter')?searchMovie() :null)
verMasSimilar.addEventListener('click', ()=>location.hash = `#similarMovies=${heroPoster.dataset.id}`)


//Utils functions 

function redondear(numero){
    if(numero == 0){
        return "IMBD No"
     }else{ 
        const n = (Math.floor(numero*10)/10).toFixed(1)
        return `IMBD ${(n == 10.00)? '10.': n}`
    }
}

function render(movieList){
    const moviesRendered = []
    movieList.forEach(movie => {
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
        imbdSpan.classList.add('spanSquare')

        imgRandomMovieContainer.append(movieImg)
        movieHeader.append(tituloRandomMovie,imbdSpan)
        movieContainer.append(imgRandomMovieContainer, movieHeader)
        movieContainer.dataset.id = movie.id
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w342' + movie.poster_path)
        tituloRandomMovie.textContent = movie.title
        imbdSpan.textContent = redondear(movie.vote_average)
        moviesRendered.push(movieContainer)
    })
    return moviesRendered
}

async function categoryList(){
    const {data} = await api('/genre/movie/list') 
    const myList = {}
    data.genres.forEach(genre=>{
        myList[genre.id] = genre.name
    })
    return myList
}

function render2(movieList, categories){
    const movies = []
    const moviesFaceless = []
    movieList.forEach(movie=>{
        const article = document.createElement('article')
        const imgContainer = document.createElement('div')
        const img = document.createElement('img')
        const description = document.createElement('div')
        const titulo = document.createElement('h4')
        const genres = document.createElement('span')
        const features = document.createElement('div')
        const imbdButton = document.createElement('span')
        const date = document.createElement('span')
        const age = document.createElement('span')
        const language = document.createElement('span')

        article.classList.add('searchResultArticle')
        imgContainer.classList.add('imgResultContainer')
        img.classList.add('imgResult')
        genres.classList.add('searchResultSubtitle')
        description.classList.add('descriptionResultContainer')
        titulo.classList.add('tituloRandomMovie')
        titulo.classList.add('text-left')
        features.classList.add('featuresOfResult')
        imbdButton.classList.add('spanSquare')
        imbdButton.classList.add('imbdSpan')
        imbdButton.classList.add('mt-1')
        date.classList.add('spanSquare')
        language.classList.add('spanSquare')
        age.classList.add('spanSquare')

        img.setAttribute('src', 'https://image.tmdb.org/t/p/w342'+ movie.poster_path)
        titulo.textContent = movie.title
        genres.textContent = categories[movie.genre_ids[0]]
        imbdButton.textContent = redondear(movie.vote_average)
        if(movie.release_date){
            const [year, month, day] = movie.release_date.split('-')
            date.textContent = year
        }else{
            date.textContent = 'nd'
        }
        age.textContent = movie.adult? '+18' : '+13'
        language.textContent = movie.original_language
        features.append(imbdButton, age, date, language)
        description.append(titulo, genres, features)
        imgContainer.append(img)
        article.append(imgContainer, description)
        article.dataset.id = movie.id
        if(movie.poster_path){
            movies.push(article)
        }else{
            moviesFaceless.push(article)
        }
    })
    return [...movies, ...moviesFaceless]
}



// main renderSection Functions 

async function getHero(id){

    const {data} = await api(`/movie/${id}`)
    heroMovieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w500'+data.poster_path)
    heroMovieTitle.textContent = data.title
    heroMovieScore.textContent = redondear(data.vote_average)
    movieDescriptionText.textContent = data.overview
}

async function getTrendings(){
    const {data} = await api('/trending/movie/day') 
    const n = Math.floor(Math.random() * data.results.length)
    heroPoster.dataset.id = data.results[n].id 
    trendingMoviesContainer.innerHTML = ''
    const movieList = render(data.results)
    trendingMoviesContainer.append(...movieList)
    trendingMoviesContainer.addEventListener('click', (event)=>{
        location.hash = '#movie='+event.target.dataset.id
    })
}

async function getCategoryList(){
    const categories = await categoryList()
    const buttons = []
    for(genre in categories){
        const name =  categories[genre]
        const id =  genre
        const categoryButton = document.createElement('button')
        categoryButton.setAttribute('type', 'button')
        categoryButton.setAttribute('id', `genre-${id}`)
        categoryButton.classList.add('categoryButton')
        categoryButton.textContent = name
        categoryButton.addEventListener('click', ()=>location.hash=`#category=${name}-${id}`)
        buttons.push(categoryButton)
    }
    categorySection.innerHTML = ''
    categorySection.append(...buttons)
}

async function getCategory(id){
    const {data} = await api('/discover/movie',{
        params: {
            with_genres: id
        }
    }) 
    moviesByCategory.innerHTML = ''
    const movieList = render(data.results)
    moviesByCategory.append(...movieList)
}

async function searchQuery(query){
    searchInputText.textContent =`for "${query}"` 
    const {data} = await api('/search/movie',{
        params: {
            query,
        }
    })
    const categories = await categoryList()
    const movies = render2(data.results, categories)
    searchResultsSection.innerHTML = ''
    searchResultsSection.append(...movies)
    searchResultsSection.addEventListener('click', event=>location.hash = '#movie='+event.target.dataset.id )
}

async function getSimilarmovies(query){
    const {data} = await api(`/movie/${query}/similar`) 
    similarMoviesContainer.innerHTML = ''
    const movieList = render(data.results)
    similarMoviesContainer.append(...movieList)
    similarMoviesContainer.addEventListener('click', (event)=>{
        location.hash = '#movie='+event.target.dataset.id
    })
}

function searchMovie(){
    if(searchInput.value.length < 3){
        console.log('tu madre')
    }else{
        location.hash = '#search=' + (searchInput.value.trim().split(' ')).join('&')
    }
}


