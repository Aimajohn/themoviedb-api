window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)

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
    movieDescription.classList.add('hidden')
    searchInputContainer.classList.remove('hidden')
    trendingSectionTitle.textContent = 'Trending Movies'
    categorySection.classList.remove('hidden')
    getTrendings()
    getCategories()
}
function trendsPage(){
    movieDescription.classList.add('hidden')
    searchInputContainer.classList.remove('hidden')
    trendingSectionTitle.textContent = 'Trending Movies'
    categorySection.classList.remove('hidden')
    getTrendings()
    getCategories()
}
function categoryPage(){
    movieDescription.classList.add('hidden')
    searchInputContainer.classList.remove('hidden')
    trendingSectionTitle.textContent = 'Trending Movies'
    categorySection.classList.remove('hidden')
    getTrendings()
    getCategories()
}

function homePage(){
    movieDescription.classList.add('hidden')
    searchInputContainer.classList.remove('hidden')
    trendingSectionTitle.textContent = 'Trending Movies'
    categorySection.classList.remove('hidden')
    getTrendings()
    getCategories()
}

function moviePage(){
    searchInputContainer.classList.add('hidden')
    movieDescription.classList.remove('hidden')
    trendingSectionTitle.textContent = 'Peliculas Similares'
    categorySection.classList.add('hidden')
    getTrendings()
}