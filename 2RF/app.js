// Edamam API Details
const appID = '491c1fee';
const appKey = 'ccb29daba217bd1fe1aa62067f8790dc';

const recipeContainer = document.getElementById('recipe-container');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const loadMoreButton = document.getElementById('load-more-button');
const loadingSpinner = document.getElementById('loading-spinner');
const suggestionBox = document.getElementById('suggestion-box');

let currentPage = 0;
let currentQuery = '';

searchButton.addEventListener('click', () => {
    currentQuery = searchInput.value.trim();
    currentPage = 0;
    recipeContainer.innerHTML = '';
    if (currentQuery) {
        fetchRecipes(currentQuery, currentPage);
    }
});

loadMoreButton.addEventListener('click', () => {
    currentPage += 10;
    fetchRecipes(currentQuery, currentPage);
});

async function fetchRecipes(query, from = 0) {
    loadingSpinner.classList.remove('hidden');
    
    let healthQuery = '';
    if (document.getElementById('vegan').checked) healthQuery += '&health=vegan';
    if (document.getElementById('vegetarian').checked) healthQuery += '&health=vegetarian';
    if (document.getElementById('gluten-free').checked) healthQuery += '&health=gluten-free';
    if (document.getElementById('paleo').checked) healthQuery += '&health=paleo';
    if (document.getElementById('keto').checked) healthQuery += '&health=keto';

    let sortQuery = document.getElementById('sort-by').value;
    const apiUrl = `https://api.edamam.com/search?q=${query}&app_id=${appID}&app_key=${appKey}&from=${from}&to=${from + 10}${healthQuery}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Error fetching recipes');
        
        const data = await response.json();
        displayRecipes(data.hits);
    } catch (error) {
        console.error(error);
        recipeContainer.innerHTML = `<p>Failed to load recipes. Please try again later.</p>`;
    } finally {
        loadingSpinner.classList.add('hidden');
    }
}

function displayRecipes(recipes) {
    if (recipes.length === 0) {
        recipeContainer.innerHTML = `<p>No recipes found.</p>`;
        return;
    }
    recipes.forEach(recipeData => {
        const recipe = recipeData.recipe;
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');

        recipeElement.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.label}">
            <h3>${recipe.label}</h3>
            <p>Calories: ${Math.round(recipe.calories)}</p>
            <p>Servings: ${recipe.yield}</p>
            <p>Cooking Time: ${recipe.totalTime || 'N/A'} mins</p>
            <h4>Ingredients:</h4>
            <ul>${recipe.ingredientLines.map(ing => `<li>${ing}</li>`).join('')}</ul>
            <a href="${recipe.url}" target="_blank">View Full Recipe</a>
        `;
        recipeContainer.appendChild(recipeElement);
    });
}
