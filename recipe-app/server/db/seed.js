const db = require('./database');

// Sample recipes
const recipes = [
  {
    title: "Spaghetti Carbonara",
    ingredients: "Spaghetti, Eggs, Parmesan, Pancetta, Black Pepper",
    instructions: "Boil pasta. Cook pancetta. Mix eggs and cheese. Combine all with pasta and serve.",
    image_url: "https://source.unsplash.com/featured/?spaghetti"
  },
  {
    title: "Classic Pancakes",
    ingredients: "Flour, Milk, Eggs, Sugar, Baking Powder, Butter",
    instructions: "Mix ingredients. Pour batter on griddle. Flip when bubbly. Serve warm.",
    image_url: "https://source.unsplash.com/featured/?pancakes"
  },
  {
    title: "Grilled Cheese Sandwich",
    ingredients: "Bread, Cheddar Cheese, Butter",
    instructions: "Butter bread. Place cheese between slices. Grill until golden brown.",
    image_url: "https://source.unsplash.com/featured/?grilled-cheese"
  },
  {
    title: "Avocado Toast",
    ingredients: "Bread, Avocado, Salt, Lemon Juice, Chili Flakes",
    instructions: "Toast bread. Mash avocado with lemon and salt. Spread on toast, sprinkle chili flakes.",
    image_url: "https://source.unsplash.com/featured/?avocado-toast"
  },
  {
    title: "Chicken Stir Fry",
    ingredients: "Chicken Breast, Bell Peppers, Soy Sauce, Garlic, Onion, Broccoli",
    instructions: "Cook chicken. Add vegetables and garlic. Stir in soy sauce and cook until tender.",
    image_url: "https://source.unsplash.com/featured/?stir-fry"
  },
  {
    title: "Beef Tacos",
    ingredients: "Ground Beef, Taco Shells, Lettuce, Tomato, Cheese, Sour Cream",
    instructions: "Cook beef with seasoning. Assemble tacos with toppings.",
    image_url: "https://source.unsplash.com/featured/?tacos"
  },
  {
    title: "Tomato Soup",
    ingredients: "Tomatoes, Onion, Garlic, Basil, Vegetable Broth, Cream",
    instructions: "Cook tomatoes and onion. Blend with broth and basil. Add cream and simmer.",
    image_url: "https://source.unsplash.com/featured/?tomato-soup"
  },
  {
    title: "Caesar Salad",
    ingredients: "Romaine Lettuce, Croutons, Parmesan, Caesar Dressing",
    instructions: "Toss lettuce with dressing. Add croutons and parmesan.",
    image_url: "https://source.unsplash.com/featured/?caesar-salad"
  },
  {
    title: "Banana Smoothie",
    ingredients: "Banana, Milk, Yogurt, Honey, Ice",
    instructions: "Blend all ingredients until smooth.",
    image_url: "https://source.unsplash.com/featured/?banana-smoothie"
  },
  {
    title: "Chocolate Chip Cookies",
    ingredients: "Flour, Sugar, Butter, Eggs, Chocolate Chips, Baking Soda, Vanilla",
    instructions: "Mix ingredients. Drop spoonfuls on baking sheet. Bake at 350°F for 10-12 minutes.",
    image_url: "https://source.unsplash.com/featured/?cookies"
  }
];

// Insert each recipe
db.serialize(() => {
  const stmt = db.prepare(`
    INSERT INTO recipes (title, ingredients, instructions, image_url)
    VALUES (?, ?, ?, ?)
  `);

  recipes.forEach(recipe => {
    stmt.run(recipe.title, recipe.ingredients, recipe.instructions, recipe.image_url);
  });

  stmt.finalize(() => {
    console.log("✅ Sample recipes inserted successfully!");
    db.close();
  });
});