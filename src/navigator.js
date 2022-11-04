window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)

function addHidden(elementos){
    elementos.forEach(elemento => elemento.classList.add('hidden'))
}
function removeHidden(elementos){
    elementos.forEach(elemento => elemento.classList.remove('hidden'))
}

function navigator(){
    window.scrollTo(0,0)
    if(location.hash.startsWith('#trends')){
        trendsPage()
    }
    else if(location.hash.startsWith('#movie=')){
        moviePage()
    }
    else if(location.hash.startsWith('#similarMovies=')){
        similarPage()
    }
    else if(location.hash.startsWith('#search=')){
        const [_, query] = location.hash.split('=')
        searchPage(query)
    }
    else if(location.hash.startsWith('#category=')){
        const [_, category] = location.hash.split('=')
        categoryPage(category)
    }
    else{
        homePage()
    }

}

function searchPage(query){
    const toRemove = [backButton,searchPageTitle, searchInputContainer, searchResultsSection]
    const toAdd = [movieDescription, heroPoster, pageLogo, trendingSection, categorySection, verMasTrends, similarSection, categoriesTitle]
    addHidden(toAdd)
    removeHidden(toRemove)
    // searchInputContainer.classList.add('mt-28')
    searchInputContainer.classList.add('searchInputView')
    trendingSectionTitle.textContent = 'Trending Movies'
    searchQuery(query)
}
function trendsPage(){
    const toRemove = [backButton, trendingSectionTitle, ]
    const toAdd = [movieDescription, heroPoster, categoriesTitle, pageLogo, categorySection, searchResultsSection, searchInputContainer, searchInputContainer, searchPageTitle, verMasTrends, similarSection]
    // trendingSection.classList.add('pt-20')
    addHidden(toAdd)
    removeHidden(toRemove)
    
    trendingMoviesContainer.classList.add('flex-wrap')
    getTrendings()
}
async function homePage(){
    const toAdd = [backButton,movieDescription,searchPageTitle,searchResultsSection, moviesByCategory]
    const toRemove = [searchInputContainer, verMasSimilar, categorySection,pageLogo,heroPoster,trendingSection,categorySection, verMasTrends, trendingMoviesContainer, similarSection, trendingSectionTitle, categoriesTitle, ]
    addHidden(toAdd)
    removeHidden(toRemove)
    trendingSectionTitle.classList.remove('mt-20')
    trendingMoviesContainer.classList.remove('flex-wrap')
    trendingMoviesContainer.classList.remove('justify-evenly')
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

async function similarPage(){
    const toRemove = [backButton , similarSection, ]
    const toAdd = [movieDescription, heroPoster, pageLogo, verMasSimilar, categoriesTitle, categorySection, searchResultsSection, searchInputContainer, searchInputContainer, searchPageTitle, verMasTrends, trendingSectionTitle, trendingSection]
    // similarSectionTitle.classList.add('mt-20')
    addHidden(toAdd)
    removeHidden(toRemove)
    
    similarMoviesContainer.classList.add('flex-wrap')
    getSimilarmovies(heroPoster.dataset.id)
}

function categoryPage(category){
    const [categoryName, categoryId] = category.split('-')
    const toRemove = [backButton, trendingSectionTitle, moviesByCategory]
    const toAdd = [movieDescription, heroPoster, pageLogo, categorySection, searchResultsSection, searchInputContainer, searchInputContainer, searchPageTitle, verMasTrends, trendingMoviesContainer, similarSection, categoriesTitle]
    addHidden(toAdd)
    removeHidden(toRemove)
    trendingSectionTitle.textContent = categoryName
    getCategory(categoryId)
    // trendingSectionTitle.classList.add('pt-20')
}

function moviePage(){
    const toAdd = [searchInputContainer, categorySection, categoriesTitle,heroPresentation, searchPageTitle, searchResultsSection, trendingMoviesContainer, trendingSection,]
    const toRemove = [movieDescription, backButton, heroPoster, pageLogo, similarSection]
    addHidden(toAdd)
    removeHidden(toRemove)

    heroPresentation.classList.add('lg:hidden')
    similarMoviesContainer.classList.remove('flex-wrap')
    similarMoviesContainer.classList.remove('justify-evenly')
    const [_, query] = location.hash.split('=')
    heroPoster.dataset.id = query
    getHero(query, window.innerWidth)
    getSimilarmovies(query)
}