async function searchRecipes() {
    const ingredientInput = document.getElementById("ingredientInput").value;
    if (!ingredientInput) {
        alert("Please enter ingredients!");
        return;
    }

    const apiKey = "953e670b3fbb4e45889d37b077a642c5";  // Replace with your Spoonacular API Key
    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientInput}&number=5&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayRecipes(data);
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById("recipes");
    recipesContainer.innerHTML = "";

    if (recipes.length === 0) {
        recipesContainer.innerHTML = "<p>No recipes found. Try different ingredients.</p>";
        return;
    }

    recipes.forEach(recipe => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");

        recipeDiv.innerHTML = `
          <h3>${recipe.title}</h3>
          <img src="${recipe.image}" alt="${recipe.title}">
          <a href="https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-")}-${recipe.id}" target="_blank">View Recipe</a>
      `;

        recipesContainer.appendChild(recipeDiv);
    });
}
