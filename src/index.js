
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params:{
        api_key: '41f595b6e9a3306dcd645e1eab82f413'
    }
})

backButton.addEventListener('click', goBack)
searchButton.addEventListener('click', searchMovie)
searchInput.addEventListener('keydown', (event)=>{
    if(event.key == 'Enter'){
        searchMovie()
    }
})

function redondear(numero){
    if(numero == 0){
        return "IMBD No"
     }else{ 
        return `IMBD ${(Math.floor(numero*10)/10).toFixed(1) }`
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

        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w342' + movie.poster_path)
        tituloRandomMovie.textContent = movie.title
        imbdSpan.textContent = redondear(movie.vote_average)
        moviesRendered.push(movieContainer)
    })
    return moviesRendered
}

async function getTrendings(){
    const {data} = await api('/trending/movie/day') 
    console.log(data.results)

    const heroMovie = data.results[data.results.length-2]
    heroMovieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w500'+heroMovie.poster_path)
    heroMovieTitle.textContent = heroMovie.title
    heroMovieScore.textContent = redondear(heroMovie.vote_average)
    trendingMoviesContainer.innerHTML = ''

    const movieList = render(data.results)
    trendingMoviesContainer.append(...movieList)
}

async function categoryList(){
    const {data} = await api('/genre/movie/list') 
    const myList = {}
    data.genres.forEach(genre=>{
        myList[genre.id] = genre.name
    })
    return myList
}

async function getCategoryList(){
    const categories = await categoryList()
    const buttons = []
    console.log(categories)
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
        const [year, month, day] = movie.release_date.split('-')
        date.textContent = year
        age.textContent = movie.adult? '+18' : '+13'
        language.textContent = movie.original_language
        features.append(imbdButton, age, date, language)
        description.append(titulo, genres, features)
        imgContainer.append(img)
        article.append(imgContainer, description)
        if(movie.poster_path){
            movies.push(article)
        }else{
            moviesFaceless.push(article)
        }
    })
    return [...movies, ...moviesFaceless]
}

async function searchQuery(query){
    searchInputText.textContent =`for "${query}"` 
    const {data} = await api('/search/movie',{
        params: {
            query,
        }
    })
    console.log(data.results)
    const categories = await categoryList()
    const movies = render2(data.results, categories)
    searchResultsSection.innerHTML = ''
    searchResultsSection.append(...movies)
}

function searchMovie(){
    if(searchInput.value.length < 3){
        console.log('tu madre')
    }else{
        location.hash = '#search=' + (searchInput.value.trim().split(' ')).join('&')
    }
}

function goBack(){
    location.hash = window.history.back()
}