window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)

function addHidden(elementos){
    elementos.forEach(elemento => elemento.classList.add('hidden'))
}
function removeHidden(elementos){
    elementos.forEach(elemento => elemento.classList.remove('hidden'))
}

function navigator(){
    if(location.hash.startsWith('#trends')){
        trendsPage()
    }
    else if(location.hash.startsWith('#movie=')){
        moviePage()
    }
    else if(location.hash.startsWith('#search=')){
        searchPage()
    }
    else if(location.hash.startsWith('#category=')){
        categoryPage()
    }
    else{
        homePage()
    }

}

function searchPage(){
    const toRemove = [backButton, tuneButton,searchPageTitle, searchInputContainer, searchResultsSection]
    const toAdd = [movieDescription, heroPoster, pageLogo, trendingSection, shortCategories, categorySection, verMasTrends]
    addHidden(toAdd)
    removeHidden(toRemove)
    searchInputContainer.classList.add('mt-28')
    trendingSectionTitle.textContent = 'Trending Movies'
}
function trendsPage(){
    const toRemove = [backButton, tuneButton, trendingSectionTitle, ]
    const toAdd = [movieDescription, heroPoster, pageLogo, shortCategories, categorySection, searchResultsSection, searchInputContainer, searchInputContainer, searchPageTitle, verMasTrends]
    trendingSection.classList.add('pt-20')
    addHidden(toAdd)
    removeHidden(toRemove)

    trendingMoviesContainer.classList.add('flex-wrap')
    trendingMoviesContainer.classList.add('justify-evenly')
    getTrendings()
}
function categoryPage(){
    const toRemove = [backButton, tuneButton, trendingSectionTitle, ]
    const toAdd = [movieDescription, heroPoster, pageLogo, shortCategories, categorySection, searchResultsSection, searchInputContainer, searchInputContainer, searchPageTitle, verMasTrends]
    trendingSection.classList.add('pt-20')
    addHidden(toAdd)
    removeHidden(toRemove)
    trendingSectionTitle.textContent = 'Action'
    trendingMoviesContainer.classList.add('flex-wrap')
    trendingMoviesContainer.classList.add('justify-evenly')
    getTrendings()
}

function homePage(){
    const toAdd = [backButton,tuneButton,movieDescription,searchPageTitle,searchResultsSection,]
    const toRemove = [searchInputContainer,categorySection,pageLogo,heroPoster,trendingSection,categorySection,shortCategories, verMasTrends]
    addHidden(toAdd)
    removeHidden(toRemove)
    trendingSection.classList.remove('pt-20')
    trendingMoviesContainer.classList.remove('flex-wrap')
    trendingMoviesContainer.classList.remove('justify-evenly')
    trendingSectionTitle.textContent = 'Trending Movies'
    searchInputContainer.classList.remove('mt-28')
    getTrendings()
    getCategories()
}

function moviePage(){
    const toAdd = [searchInputContainer, categorySection, searchPageTitle, tuneButton, searchResultsSection]
    const toRemove = [movieDescription, backButton]
    addHidden(toAdd)
    removeHidden(toRemove)
    trendingSectionTitle.textContent = 'Peliculas Similares'
    getTrendings()
}