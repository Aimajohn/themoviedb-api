let page = 1;
let maxPage;

// Header functions

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params:{
        api_key: '41f595b6e9a3306dcd645e1eab82f413'
    }
})


//Utils functions 

const callback = (entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.setAttribute('src', entry.target.getAttribute('data-src')) 
        }
    })
}
const observer = new IntersectionObserver(callback)

function redondear(numero){
    if(numero == 0){
        return "IMBD No"
     }else{ 
        const n = (Math.floor(numero*10)/10).toFixed(1)
        return `IMBD ${(n == 10.00)? '10.': n}`
    }
}

function render(movieList, lazy=false){
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

        movieImg.classList.add('movieImg')
        imgRandomMovieContainer.append(movieImg)
        movieHeader.append(tituloRandomMovie,imbdSpan)
        movieContainer.append(imgRandomMovieContainer, movieHeader)
        movieContainer.dataset.id = movie.id
        movieImg.setAttribute( lazy?'data-src':'src', 'https://image.tmdb.org/t/p/w342' + movie.poster_path)
        // movieImg.setAttribute('loading', 'lazy')
        if(lazy){
            observer.observe(movieImg)
        }
        tituloRandomMovie.textContent = movie.title
        imbdSpan.textContent = redondear(movie.vote_average)
        moviesRendered.push(movieContainer)
    })
    return moviesRendered
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
            img.setAttribute('src', 'https://image.tmdb.org/t/p/w342'+ movie.poster_path)
            movies.push(article)
        }else{
            img.setAttribute('src', '/src/imgs/default.png')
            moviesFaceless.push(article)
        }
    })
    return [...movies, ...moviesFaceless]
}

async function categoryList(){
    const {data} = await api('/genre/movie/list') 
    const myList = {}
    data.genres.forEach(genre=>{
        myList[genre.id] = genre.name
    })
    return myList
}

async function whichSize(width){
    let awi;
    [92, 154, 185, 342, 500, 780].forEach(size=>{
        if(width < size){
            return awi = size;
        }
    })
    return (awi)?awi:"original"
}

// Infinitive Pages

async function trendingChunk(page=1){
    const {data} = await api('/trending/movie/day',{
        params:{
            page,
        }
    }) 
    return data
}

async function categoryChunk(id, page=1){
    const {data} = await api('/discover/movie',{
        params: {
            with_genres: id,
        }
    }) 
    return data
}

async function similarChunk(query, page=1){
    const {data} = await api(`/movie/${query}/similar`,{
        params:{
            page,
        }
    }) 
    return data
}

// main renderSection Functions 

async function getHero(id, width){
    const posterSize = await whichSize(width)
    const {data} = await api(`/movie/${id}`)
    if(typeof(posterSize)=="string"){
        heroMovieImg.setAttribute('src', `https://image.tmdb.org/t/p/${posterSize}${data.backdrop_path}`)
    }else{
        heroMovieImg.setAttribute('src', `https://image.tmdb.org/t/p/${`w${posterSize}`}${data.poster_path}`)
    }
    heroMovieTitle.textContent = data.title
    heroMovieScore.textContent = redondear(data.vote_average)
    movieDescriptionText.textContent = data.overview
}

async function getTrendings(){
    const data = await trendingChunk()
    maxPage = data.total_pages
    const n = Math.floor(Math.random() * data.results.length)
    heroPoster.dataset.id = data.results[n].id 
    const movieList = render(data.results, true)
    trendingMoviesContainer.innerHTML = ''
    trendingMoviesContainer.append(...movieList)
    trendingMoviesContainer.addEventListener('click', (event)=>{
        console.log(event.target)
        if(event.target.dataset.id){
            location.hash = '#movie='+event.target.dataset.id
        }
    }, true)
}

async function getCategoryList(){
    const categories = await categoryList()
    const colors = ['#006A7A', '#D4A418', '#1F0000', '#B4B9D2', '#548EF8', '#4A0218', '#358EFF', '#B47A9B', '#0047B3', '#B998FF']
    const i = colors.length
    const buttons = []
    for(genre in categories){
        const name =  categories[genre]
        const id =  genre
        const categoryButton = document.createElement('div')
        categoryButton.setAttribute('id', `genre-${id}`)
        categoryButton.classList.add('categoryButton')
        const square = document.createElement('div')
        const buttonContent = document.createElement('div')
        const buttonTitle = document.createElement('h4')
        const buttonText = document.createElement('p')
        square.classList.add('decorationSquare')
        buttonContent.classList.add('mr-5')
        buttonText.classList.add('buttonVerMas')
        buttonTitle.classList.add('buttonTitle')
        buttonTitle.textContent = name
        buttonText.textContent = 'Ver Mas'
        
        square.style.backgroundColor=colors[Math.floor(Math.random()*i)]
        buttonContent.append(buttonTitle, buttonText)
        categoryButton.append(square, buttonContent)
        buttons.push(categoryButton)

        
        categoryButton.addEventListener('click', ()=>location.hash=`#category=${name}-${id}`)
    }
    categorySection.innerHTML = ''
    categorySection.append(...buttons)
}

async function getCategory(id){
    const data = await categoryChunk(id)
    moviesByCategory.innerHTML = ''
    const movieList = render(data.results)
    moviesByCategory.append(...movieList)
    moviesByCategory.addEventListener('click', (event)=>{
        if(event.target.dataset.id){
            location.hash = '#movie='+event.target.dataset.id
        }
    })
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
    searchResultsSection.addEventListener('click', event=>{
        if(event.target.dataset.id){
            location.hash = '#movie='+event.target.dataset.id
        }
    })
}

async function getSimilarmovies(query){
    const data = await similarChunk(query)
    similarMoviesContainer.innerHTML = ''
    const movieList = render(data.results)
    similarMoviesContainer.append(...movieList)
    similarMoviesContainer.addEventListener('click', (event)=>{
        console.log('hola')
        if(event.target.dataset.id){
            location.hash = '#movie='+event.target.dataset.id
        }
    }, true)
}

function searchMovie(){
    if(searchInput.value.length < 3){
        console.log('tu madre')
    }else{
        location.hash = '#search=' + (searchInput.value.trim().split(' ')).join('&')
    }
}


