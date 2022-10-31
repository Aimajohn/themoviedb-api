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
    const toRemove = [backButton, tuneButton,searchPageTitle, searchInputContainer, searchResultsSection]
    const toAdd = [movieDescription, heroPoster, pageLogo, trendingSection, categorySection, verMasTrends]
    addHidden(toAdd)
    removeHidden(toRemove)
    searchInputContainer.classList.add('mt-28')
    trendingSectionTitle.textContent = 'Trending Movies'
    searchQuery(query)
}
function trendsPage(){
    const toRemove = [backButton, tuneButton, trendingSectionTitle, ]
    const toAdd = [movieDescription, heroPoster, pageLogo, categorySection, searchResultsSection, searchInputContainer, searchInputContainer, searchPageTitle, verMasTrends]
    trendingSection.classList.add('pt-20')
    addHidden(toAdd)
    removeHidden(toRemove)
    
    trendingMoviesContainer.classList.add('flex-wrap')
    trendingMoviesContainer.classList.add('justify-evenly')
    getTrendings()
}
function homePage(){
    const toAdd = [backButton,tuneButton,movieDescription,searchPageTitle,searchResultsSection, moviesByCategory]
    const toRemove = [searchInputContainer,categorySection,pageLogo,heroPoster,trendingSection,categorySection, verMasTrends, trendingMoviesContainer]
    addHidden(toAdd)
    removeHidden(toRemove)
    
    trendingMoviesContainer.classList.remove('flex-wrap')
    trendingMoviesContainer.classList.remove('justify-evenly')
    trendingSection.classList.remove('pt-20')
    trendingSectionTitle.textContent = 'Trending Movies'
    searchInputContainer.classList.remove('mt-28')
    getTrendings()
    getCategoryList()
}
function categoryPage(category){
    const [categoryName, categoryId] = category.split('-')
    const toRemove = [backButton, tuneButton, trendingSectionTitle, moviesByCategory]
    const toAdd = [movieDescription, heroPoster, pageLogo, categorySection, searchResultsSection, searchInputContainer, searchInputContainer, searchPageTitle, verMasTrends, trendingMoviesContainer]
    addHidden(toAdd)
    removeHidden(toRemove)
    trendingSectionTitle.textContent = categoryName
    getCategory(categoryId)
    trendingSectionTitle.classList.add('pt-20')
}

function moviePage(){
    const toAdd = [searchInputContainer, categorySection, searchPageTitle, tuneButton, searchResultsSection]
    const toRemove = [movieDescription, backButton]
    addHidden(toAdd)
    removeHidden(toRemove)
    trendingSectionTitle.textContent = 'Peliculas Similares'
    getTrendings()
}