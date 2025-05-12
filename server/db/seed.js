// Import the database connection
const db = require('./database');

// Clear the table
db.run('DELETE FROM recipes', (err) => {
  if (err) {
    console.error('Error clearing recipes table:', err.message);
  } else {
    console.log('✅ Recipes table cleared!');
    
// Sample recipe data to populate the database
const recipes = [
  {
    title: "Spaghetti Bolognese",
    ingredients: "Large Yellow Onion, 2-3 Large Carrots, 1 Tbsp Olive Oil, 1 lb 80% Lean Ground Beef, 1/2 cup Dry Red Wine, 1/2 can Tomato Paste, 32 oz Crushed Tomatoes, 1 tsp Soy Sauce, 1 tsp Crushed Red Pepper Flakes (to taste), 1 Bay Leaf, 1 tsp Sugar, 2 Tbsp Italian Seasoning, 1/4 cup Half and Half, Salt, Pepper, Spaghetti Noodles, Parmesan Cheese",
    instructions: "Dice onion, grate carrots. Heat oil in a large pot on medium heat, add onion and carrot. Stirring frequently, cook until soft and onion is translucent. Add beef and brown with vegetables. Drain grease. Add tomato paste, cook for two minutes. Add the wine, deglaze the pot by scraping down with a wooden spoon. Simmer until you can't smell the alcohol, approx 5 minutes. Add crushed tomatoes, soy sauce, bay leaf, red pepper flakes and sugar. Mix well and cover. Reduce heat to low and simmerfor at least 30 minutes, up to 2 hours. In the last 10 minutes, add Italian Seasoning and salt and pepper to taste. Stir in half and half and stir. Prepare pasta to package directions. Serve sauce over pasta and top with parmesan cheese.",
    image_path: "https://source.unsplash.com/featured/?spaghetti"
  },
  {
    title: "Classic Pancakes",
    ingredients: "Flour, Milk, Eggs, Sugar, Baking Powder, Butter",
    instructions: "Mix ingredients. Pour batter on griddle. Flip when bubbly. Serve warm.",
    image_path: "https://source.unsplash.com/featured/?pancakes"
  },
  {
    title: "Grilled Cheese Sandwich",
    ingredients: "Bread, Cheddar Cheese, Butter",
    instructions: "Butter bread. Place cheese between slices. Grill until golden brown.",
    image_path: "https://source.unsplash.com/featured/?grilled-cheese"
  },
  {
    title: "Avocado Toast",
    ingredients: "Bread, Avocado, Salt, Lemon Juice, Chili Flakes",
    instructions: "Toast bread. Mash avocado with lemon and salt. Spread on toast, sprinkle chili flakes.",
    image_path: "https://source.unsplash.com/featured/?avocado-toast"
  },
  {
    title: "Chicken Stir Fry",
    ingredients: "Chicken Breast, Bell Peppers, Soy Sauce, Garlic, Onion, Broccoli",
    instructions: "Cook chicken. Add vegetables and garlic. Stir in soy sauce and cook until tender.",
    image_path: "https://source.unsplash.com/featured/?stir-fry"
  },
  {
    title: "Beef Tacos",
    ingredients: "Ground Beef, Taco Shells, Lettuce, Tomato, Cheese, Sour Cream",
    instructions: "Cook beef with seasoning. Assemble tacos with toppings.",
    image_path: "https://source.unsplash.com/featured/?tacos"
  },
  {
    title: "Tomato Soup",
    ingredients: "Tomatoes, Onion, Garlic, Basil, Vegetable Broth, Cream",
    instructions: "Cook tomatoes and onion. Blend with broth and basil. Add cream and simmer.",
    image_path: "https://source.unsplash.com/featured/?tomato-soup"
  },
  {
    title: "Caesar Salad",
    ingredients: "Romaine Lettuce, Croutons, Parmesan, Caesar Dressing",
    instructions: "Toss lettuce with dressing. Add croutons and parmesan.",
    image_path: "https://source.unsplash.com/featured/?caesar-salad"
  },
  {
    title: "Banana Smoothie",
    ingredients: "Banana, Milk, Yogurt, Honey, Ice",
    instructions: "Blend all ingredients until smooth.",
    image_path: "https://source.unsplash.com/featured/?banana-smoothie"
  },
  {
    title: "Chocolate Chip Cookies",
    ingredients: "Flour, Sugar, Butter, Eggs, Chocolate Chips, Baking Soda, Vanilla",
    instructions: "Mix ingredients. Drop spoonfuls on baking sheet. Bake at 350°F for 10-12 minutes.",
    image_path: "https://source.unsplash.com/featured/?cookies"
  }
];

 // Seed the database with the sample recipes
    const stmt = db.prepare(`
      INSERT INTO recipes (title, ingredients, instructions, image_path)
      VALUES (?, ?, ?, ?)
    `);

    recipes.forEach(recipe => {
      stmt.run(recipe.title, recipe.ingredients, recipe.instructions, recipe.image_path);
    });

    stmt.finalize(() => {
      console.log("✅ Sample recipes inserted successfully!");
      db.close();
    });
  }
});