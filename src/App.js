import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const YOUR_APP_ID = 'e8fdfa0d'; 
  const YOUR_APP_KEY = '5b09a0849224067609d376fabcddd8f6';

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
      );
      const data = await response.json();
      setRecipes(data.hits);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes();
  };

  return (
    <div className="app">
      <h1>Recipe Finder</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}

      <div className="recipes">
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <img src={recipe.recipe.image} alt={recipe.recipe.label} />
            <h2>{recipe.recipe.label}</h2>
            <p>Calories: {Math.round(recipe.recipe.calories)}</p>
            <a href={recipe.recipe.url} target="_blank" rel="noopener noreferrer">
              View Recipe
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
