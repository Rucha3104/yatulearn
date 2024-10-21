// function displayRecipes(recipes) {
//     recipeContainer.innerHTML = '';
//     recipes.forEach(recipeData => {
//         const recipe = recipeData.recipe;
//         const recipeElement = document.createElement('div');
//         recipeElement.classList.add('recipe');

//         recipeElement.innerHTML = `
//             <img src="${recipe.image}" alt="${recipe.label}">
//             <h3>${recipe.label}</h3>
//             <p><strong>Calories:</strong> ${Math.round(recipe.calories)}</p>
//             <p><strong>Servings:</strong> ${recipe.yield}</p>
//             <p><strong>Cooking Time:</strong> ${recipe.totalTime ? recipe.totalTime + ' mins' : 'N/A'}</p>
//             <h4>Ingredients:</h4>
//             <ul>
//                 ${recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
//             </ul>
//             <a href="${recipe.url}" target="_blank" class="recipe-link">View Full Recipe</a>
//         `;

//         recipeContainer.appendChild(recipeElement);
//     });
// }
// function displayRecipes(recipes) {
//     if (recipes.length === 0) {
//         recipeContainer.innerHTML = `<p class="no-results">No recipes found. Try searching for something else.</p>`;
//         return;
//     }

//     recipeContainer.innerHTML = '';
//     recipes.forEach(recipeData => {
//         const recipe = recipeData.recipe;
//         const recipeElement = document.createElement('div');
//         recipeElement.classList.add('recipe');

//         recipeElement.innerHTML = `
//             <img src="${recipe.image}" alt="${recipe.label}">
//             <h3>${recipe.label}</h3>
//             <p><strong>Calories:</strong> ${Math.round(recipe.calories)}</p>
//             <p><strong>Servings:</strong> ${recipe.yield}</p>
//             <p><strong>Cooking Time:</strong> ${recipe.totalTime ? recipe.totalTime + ' mins' : 'N/A'}</p>
//             <h4>Ingredients:</h4>
//             <ul>
//                 ${recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
//             </ul>
//             <a href="${recipe.url}" target="_blank" class="recipe-link">View Full Recipe</a>
//         `;

//         recipeContainer.appendChild(recipeElement);
//     });
// }
// const appID = 'deshpande31'; // Replace with your Edamam App ID
// const appKey = 'Rucha@123'; // Replace with your Edamam App Key
// const recipeContainer = document.getElementById('recipe-container');
// const searchInput = document.getElementById('search-input');
// const searchButton = document.getElementById('search-button');

// searchButton.addEventListener('click', () => {
//     const query = searchInput.value;
//     if (query) {
//         fetchRecipes(query);
//     }
// });
// Replace with your Edamam App ID and Key
const appID = '491c1fee'; 
const appKey = '0a11abf73a7108875437f86b42b39b7';

const recipeContainer = document.getElementById('recipe-container');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const loadMoreButton = document.getElementById('load-more-button');
const loadingSpinner = document.getElementById('loading-spinner');

let currentPage = 0;      // To handle pagination
let currentQuery = '';    // Store the current search query

// Add event listener to search button
searchButton.addEventListener('click', () => {
    currentQuery = searchInput.value.trim(); // Get the search input
    currentPage = 0;  // Reset to first page
    recipeContainer.innerHTML = '';  // Clear previous results
    if (currentQuery) {
        fetchRecipes(currentQuery, currentPage);
    }
});

// Add event listener to "Load More" button for pagination
loadMoreButton.addEventListener('click', () => {
    currentPage += 10; // Increment page (Edamam API paginates in steps of 10)
    fetchRecipes(currentQuery, currentPage);
});

// Fetch recipes from Edamam API
async function fetchRecipes(query, from = 0) {
    // Show the loading spinner
    loadingSpinner.classList.remove('hidden');
}
    // Apply health filters (if any)
    let healthQuery = '';
    if (document.getElementById('vegan').checked) {
        healthQuery += '&health=vegan';
    }
    if (document.getElementById('vegetarian').checked) {
        healthQuery += '&health=vegetarian';
    }
    
    // API URL with pagination and health filters
    const apiUrl = "https://api.edamam.com/search?q=${query}&app_id"