window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)


function addHidden(elementos){
    elementos.forEach(elemento => elemento.classList.add('hidden'))
}
function removeHidden(elementos){
    elementos.forEach(elemento => elemento.classList.remove('hidden'))
}
let infinitiveScroll;

function navigator(){
    if(infinitiveScroll){
        window.removeEventListener('scroll', infinitiveScroll)
        infinitiveScroll = undefined
    }
    window.scrollTo(0,0)
    if(location.hash.startsWith('#trends')){
        trendsPage()
        infinitiveScroll = loadTrendingChunk
    }
    else if(location.hash.startsWith('#movie=')){
        const [_, query] = location.hash.split('=')
        moviePage(query)
    }
    else if(location.hash.startsWith('#similarMovies=')){
        const [_, id] = location.hash.split('=')
        similarPage(id)
        infinitiveScroll = ()=> loadSimilarChunk(id)
    }
    else if(location.hash.startsWith('#search=')){
        const [_, query] = location.hash.split('=')
        searchPage(query)
    }
    else if(location.hash.startsWith('#category=')){
        const [_, category] = location.hash.split('=')
        const [categoryName, categoryId] = category.split('-')
        categoryPage([categoryName, categoryId])
        infinitiveScroll = ()=> loadCategoryChunk(categoryId)
    }
    else{
        homePage()
    }
    if(infinitiveScroll){
        window.addEventListener('scroll', infinitiveScroll, {passive: false})
    }

}

function searchPage(query){
    const toRemove = [backButton,searchPageTitle, searchInputContainer, searchResultsSection]
    const toAdd = [movieDescription, heroPoster, pageLogo, trendingSection, categorySection, verMasTrends, similarSection, categoriesTitle, scrollToLeft, scrollToLeftS, scrollToRight, scrollToRightS]
    addHidden(toAdd)
    removeHidden(toRemove)
    // searchInputContainer.classList.add('mt-28')
    searchInputContainer.classList.add('searchInputView')
    trendingSectionTitle.textContent = 'Trending Movies'
    searchQuery(query)
    let page = 1;
}

async function loadTrendingChunk(){
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement
    if((scrollTop + clientHeight) >= scrollHeight - 75){
        page++
        if(page < maxPage ){
            const data = await trendingChunk(page++)
            const list = render(data.results, true)
            trendingMoviesContainer.append(...list)
        }
    }
}
async function loadSimilarChunk(id){
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement
    if((scrollTop + clientHeight) >= scrollHeight - 75){
        const data = await similarChunk(id, page++)
        const list = render(data.results, true)
        similarMoviesContainer.append(...list)
    }
}
async function loadCategoryChunk(id){
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement
    if((scrollTop + clientHeight) >= scrollHeight - 75){
        const data = await categoryChunk(id, page++)
        const list = render(data.results, true)
        moviesByCategory.append(...list)
    }
}

function trendsPage(){
    const toRemove = [backButton, trendingSectionTitle, ]
    const toAdd = [movieDescription, heroPoster, moviesByCategory, categoriesTitle, pageLogo, categorySection, searchResultsSection, searchInputContainer, searchInputContainer, searchPageTitle, verMasTrends, similarSection, scrollToLeft, scrollToLeftS, scrollToRight, scrollToRightS]
    // trendingSection.classList.add('pt-20')
    addHidden(toAdd)
    removeHidden(toRemove)
    trendingMoviesContainer.classList.add('sm:w-[98%]')
    trendingMoviesContainer.classList.add('sm:mx-auto')
    trendingMoviesContainer.classList.add('flex-wrap')
    getTrendings()
}

async function homePage(){
    const toAdd = [backButton,movieDescription,searchPageTitle,searchResultsSection, moviesByCategory]
    const toRemove = [searchInputContainer, verMasSimilar, categorySection,pageLogo,heroPoster,trendingSection,categorySection, verMasTrends, trendingMoviesContainer, similarSection, trendingSectionTitle, categoriesTitle, scrollToLeft, scrollToLeftS, scrollToRight, scrollToRightS ]
    addHidden(toAdd)
    removeHidden(toRemove)
    trendingSectionTitle.classList.remove('mt-20')
    trendingMoviesContainer.classList.remove('flex-wrap')
    trendingMoviesContainer.classList.remove('justify-evenly')
    trendingMoviesContainer.classList.remove('justify-evenly')
    trendingMoviesContainer.classList.remove('sm:w-[98%]')
    trendingMoviesContainer.classList.remove('sm:mx-auto')
    trendingMoviesContainer.classList.remove('justify-evenly')
    trendingMoviesContainer.classList.remove('sm:w-[98%]')
    trendingMoviesContainer.classList.remove('sm:mx-auto')
    similarMoviesContainer.classList.remove('sm:w-[98%]')
    similarMoviesContainer.classList.remove('sm:mx-auto')
    trendingSection.classList.remove('pt-20')
    trendingSectionTitle.textContent = 'Trending Movies'
    searchInputContainer.classList.remove('mt-28')
    similarMoviesContainer.classList.remove('flex-wrap')
    similarMoviesContainer.classList.remove('justify-evenly')
    trendingSectionTitle.classList.remove('pt-20')
    heroPresentation.classList.remove('lg:hidden')
    searchInputContainer.classList.remove('searchInputView')


    getCategoryList()
    await getTrendings()
    getHero(heroPoster.dataset.id, window.innerWidth)
    getSimilarmovies(heroPoster.dataset.id)
}

function similarPage(query){
    const toRemove = [backButton , similarSection, ]
    const toAdd = [movieDescription, heroPoster, pageLogo, verMasSimilar, categoriesTitle, categorySection, searchResultsSection, searchInputContainer, searchInputContainer, searchPageTitle, verMasTrends, trendingSectionTitle, trendingSection, scrollToLeft, scrollToLeftS, scrollToRight, scrollToRightS]
    // similarSectionTitle.classList.add('mt-20')
    addHidden(toAdd)
    removeHidden(toRemove)
    similarMoviesContainer.classList.add('sm:w-[98%]')
    similarMoviesContainer.classList.add('sm:mx-auto')
    similarMoviesContainer.classList.add('flex-wrap')
    getSimilarmovies(query)
}

function categoryPage([categoryName, categoryId]){
    const toRemove = [backButton, trendingSectionTitle, moviesByCategory]
    const toAdd = [movieDescription, heroPoster, pageLogo, categorySection, searchResultsSection, searchInputContainer, searchInputContainer, searchPageTitle, verMasTrends, trendingMoviesContainer, similarSection, categoriesTitle, scrollToLeft, scrollToLeftS, scrollToRight, scrollToRightS]
    addHidden(toAdd)
    removeHidden(toRemove)
    moviesByCategory.classList.add('sm:w-[98%]')
    moviesByCategory.classList.add('sm:mx-auto')
    trendingSectionTitle.textContent = categoryName
    getCategory(categoryId)
    // trendingSectionTitle.classList.add('pt-20')
}

function moviePage(query){
    const toAdd = [searchInputContainer, categorySection, categoriesTitle,heroPresentation, searchPageTitle, searchResultsSection, trendingMoviesContainer, trendingSection, scrollToLeft, scrollToLeftS, scrollToRight, scrollToRightS]
    const toRemove = [movieDescription, backButton, heroPoster, pageLogo, similarSection]
    addHidden(toAdd)
    removeHidden(toRemove)

    heroPresentation.classList.add('lg:hidden')
    similarMoviesContainer.classList.remove('flex-wrap')
    similarMoviesContainer.classList.remove('justify-evenly')
    heroPoster.dataset.id = query
    getHero(query, window.innerWidth)
    getSimilarmovies(query)
}


// addEventListeners 

searchButton.addEventListener('click', searchMovie)
searchInput.addEventListener('keydown', (event)=>(event.key == 'Enter')?searchMovie() :null)
verMasSimilar.addEventListener('click', ()=>location.hash = `#similarMovies=${heroPoster.dataset.id}`)
verSimilaresPoster.addEventListener('click', ()=>location.hash = `#similarMovies=${heroPoster.dataset.id}`)
scrollToRight.addEventListener('click', ()=>trendingMoviesContainer.scrollLeft+=500)
scrollToLeft.addEventListener('click', ()=>trendingMoviesContainer.scrollLeft-=500)
scrollToRightS.addEventListener('click', ()=>similarMoviesContainer.scrollLeft+=500)
scrollToLeftS.addEventListener('click', ()=>similarMoviesContainer.scrollLeft-=500)
backButton.addEventListener('click', ()=>{
    window.scrollTo(0,0)
    location.hash = window.history.back()
})
similarMoviesContainer.addEventListener('scroll',()=>{
    if(similarMoviesContainer.scrollLeft > 0){
        scrollToLeftS.classList.add('block')
    }else{
        scrollToLeftS.classList.remove('block')
    }
})
trendingMoviesContainer.addEventListener('scroll',()=>{
    console.log(trendingMoviesContainer.scrollLeft)
    if(trendingMoviesContainer.scrollLeft > 0){
        scrollToLeft.classList.add('block')
    }else{
        scrollToLeft.classList.remove('block')
    }
})