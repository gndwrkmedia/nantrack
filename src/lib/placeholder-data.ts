
import type { Recipe, Exercise, Medication, BloodPressureLog, BloodSugarLog, MoodLog } from './types';

export const placeholderRecipes: Recipe[] = [
  // Breakfast
  {
    id: 'b1',
    name: 'Avocado Toast with Egg',
    category: 'Breakfast',
    ingredients: ['1 slice whole-wheat bread', '1/2 avocado', '1 large egg', 'Red pepper flakes'],
    instructions: ['Toast the bread.', 'Mash avocado and spread it on the toast.', 'Top with a cooked egg and red pepper flakes.'],
    prepTime: 5,
    cookTime: 5,
    nutritionalInfo: { carbs: '20g', sugar: '1g', sodium: '200mg', protein: '15g' },
  },
  {
    id: 'b2',
    name: 'Oatmeal with Berries and Nuts',
    category: 'Breakfast',
    ingredients: ['1/2 cup rolled oats', '1 cup water or milk', '1/2 cup mixed berries', '1 tbsp chopped walnuts'],
    instructions: ['Cook oats with water or milk.', 'Top with berries and nuts.'],
    prepTime: 2,
    cookTime: 5,
    nutritionalInfo: { carbs: '40g', sugar: '12g', sodium: '5mg', protein: '10g' },
  },
  {
    id: 'b3',
    name: 'Greek Yogurt Parfait',
    category: 'Breakfast',
    ingredients: ['1 cup Greek yogurt', '1/4 cup granola', '1/2 cup sliced strawberries'],
    instructions: ['Layer yogurt, granola, and strawberries in a glass.'],
    prepTime: 5,
    cookTime: 0,
    nutritionalInfo: { carbs: '30g', sugar: '18g', sodium: '80mg', protein: '22g' },
  },
    { id: 'b4', name: 'Scrambled Eggs with Spinach', category: 'Breakfast', ingredients: ['2 large eggs', '1 cup spinach', '1 tbsp milk', 'Salt and pepper'], instructions: ['Wilt spinach in a pan.', 'Whisk eggs with milk, salt, and pepper.', 'Scramble eggs with spinach.'], prepTime: 3, cookTime: 5, nutritionalInfo: { carbs: '2g', sugar: '1g', sodium: '250mg', protein: '14g' } },
    { id: 'b5', name: 'Whole Wheat Pancakes', category: 'Breakfast', ingredients: ['1 cup whole wheat flour', '1 tsp baking powder', '1 egg', '1 cup milk', '1 tbsp maple syrup'], instructions: ['Mix ingredients.', 'Cook on a griddle.'], prepTime: 5, cookTime: 10, nutritionalInfo: { carbs: '35g', sugar: '15g', sodium: '400mg', protein: '8g' } },
    { id: 'b6', name: 'Cottage Cheese with Peaches', category: 'Breakfast', ingredients: ['1 cup cottage cheese', '1/2 cup sliced peaches'], instructions: ['Combine ingredients in a bowl.'], prepTime: 3, cookTime: 0, nutritionalInfo: { carbs: '15g', sugar: '12g', sodium: '450mg', protein: '25g' } },
    { id: 'b7', name: 'Breakfast Burrito', category: 'Breakfast', ingredients: ['1 whole wheat tortilla', '2 scrambled eggs', '1/4 cup black beans', '2 tbsp salsa'], instructions: ['Warm tortilla.', 'Fill with eggs, beans, and salsa.'], prepTime: 5, cookTime: 5, nutritionalInfo: { carbs: '30g', sugar: '4g', sodium: '500mg', protein: '20g' } },
    { id: 'b8', name: 'Smoothie with Kale and Apple', category: 'Breakfast', ingredients: ['1 cup kale', '1/2 apple', '1/2 banana', '1 cup almond milk'], instructions: ['Blend all ingredients until smooth.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '35g', sugar: '20g', sodium: '180mg', protein: '5g' } },
    { id: 'b9', name: 'Chia Seed Pudding', category: 'Breakfast', ingredients: ['3 tbsp chia seeds', '1 cup almond milk', '1 tsp vanilla extract', 'Mixed berries'], instructions: ['Mix chia seeds, milk, and vanilla.', 'Refrigerate overnight.', 'Top with berries.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '20g', sugar: '8g', sodium: '170mg', protein: '8g' } },
    { id: 'b10', name: 'English Muffin with Peanut Butter', category: 'Breakfast', ingredients: ['1 whole wheat English muffin', '2 tbsp peanut butter'], instructions: ['Toast muffin.', 'Spread with peanut butter.'], prepTime: 2, cookTime: 2, nutritionalInfo: { carbs: '30g', sugar: '5g', sodium: '300mg', protein: '12g' } },
    { id: 'b11', name: 'Mushroom and Feta Omelette', category: 'Breakfast', ingredients: ['2 large eggs', '1/4 cup sliced mushrooms', '2 tbsp feta cheese', '1 tbsp chopped chives'], instructions: ['Sauté mushrooms until soft.', 'Whisk eggs and pour into pan.', 'Add feta and chives, then fold omelette.'], prepTime: 5, cookTime: 7, nutritionalInfo: { carbs: '3g', sugar: '2g', sodium: '350mg', protein: '16g' } },
    { id: 'b12', name: 'Cinnamon Quinoa Bowl', category: 'Breakfast', ingredients: ['1 cup cooked quinoa', '1/2 tsp cinnamon', '1 tbsp sliced almonds', '1/2 cup unsweetened applesauce'], instructions: ['Combine warm cooked quinoa with cinnamon and almonds.', 'Top with applesauce.'], prepTime: 2, cookTime: 0, nutritionalInfo: { carbs: '50g', sugar: '15g', sodium: '10mg', protein: '10g' } },
    { id: 'b13', name: 'Ricotta Toast with Tomato', category: 'Breakfast', ingredients: ['1 slice rye bread', '1/4 cup part-skim ricotta', '3 cherry tomatoes, halved', 'Fresh basil'], instructions: ['Toast the bread.', 'Spread ricotta on toast.', 'Top with tomatoes and basil.'], prepTime: 5, cookTime: 2, nutritionalInfo: { carbs: '22g', sugar: '4g', sodium: '220mg', protein: '12g' } },
    { id: 'b14', name: 'Banana-Oat Muffins', category: 'Breakfast', ingredients: ['1 cup rolled oats', '1 ripe banana, mashed', '1 egg', '1/4 cup Greek yogurt', '1/2 tsp baking soda'], instructions: ['Mix all ingredients together.', 'Pour into muffin cups.', 'Bake at 375°F for 15-18 minutes.'], prepTime: 10, cookTime: 18, nutritionalInfo: { carbs: '25g', sugar: '10g', sodium: '180mg', protein: '6g' } },
    { id: 'b15', name: 'Poached Egg on Asparagus', category: 'Breakfast', ingredients: ['1 large egg', '5-6 asparagus spears', '1 tsp olive oil', 'Parmesan cheese shavings'], instructions: ['Steam or lightly sauté asparagus.', 'Poach an egg.', 'Place poached egg on top of asparagus and drizzle with olive oil and parmesan.'], prepTime: 5, cookTime: 8, nutritionalInfo: { carbs: '5g', sugar: '3g', sodium: '150mg', protein: '10g' } },
    { id: 'b16', name: 'Savory Yogurt Bowl', category: 'Breakfast', ingredients: ['1 cup plain Greek yogurt', '1/2 cucumber, diced', '1 tbsp olive oil', 'Pinch of dried dill'], instructions: ['Combine all ingredients in a bowl.', 'Season with salt and pepper to taste.'], prepTime: 7, cookTime: 0, nutritionalInfo: { carbs: '12g', sugar: '8g', sodium: '100mg', protein: '23g' } },
    { id: 'b17', name: 'Tofu Scramble', category: 'Breakfast', ingredients: ['1/2 block firm tofu, crumbled', '1/4 tsp turmeric', '1 cup chopped bell peppers and onions', '1 tbsp nutritional yeast'], instructions: ['Sauté peppers and onions.', 'Add crumbled tofu, turmeric, and nutritional yeast.', 'Cook until heated through.'], prepTime: 5, cookTime: 10, nutritionalInfo: { carbs: '10g', sugar: '5g', sodium: '20mg', protein: '20g' } },
    { id: 'b18', name: 'Berry and Spinach Smoothie', category: 'Breakfast', ingredients: ['1 cup spinach', '1/2 cup mixed berries', '1/4 cup Greek yogurt', '1 cup unsweetened almond milk'], instructions: ['Blend all ingredients until smooth.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '18g', sugar: '10g', sodium: '190mg', protein: '12g' } },
    { id: 'b19', name: 'Smoked Salmon on Rye Crisp', category: 'Breakfast', ingredients: ['2 rye crackers', '2 oz smoked salmon', '1 tbsp cream cheese', 'Capers and fresh dill'], instructions: ['Spread cream cheese on crackers.', 'Top with smoked salmon, capers, and dill.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '18g', sugar: '2g', sodium: '600mg', protein: '15g' } },
    { id: 'b20', name: 'Apple Cinnamon Oatmeal', category: 'Breakfast', ingredients: ['1/2 cup rolled oats', '1 cup water', '1/2 apple, chopped', '1/2 tsp cinnamon'], instructions: ['Cook oats and apple in water until soft.', 'Stir in cinnamon before serving.'], prepTime: 3, cookTime: 7, nutritionalInfo: { carbs: '45g', sugar: '14g', sodium: '5mg', protein: '8g' } },
    { id: 'b21', name: 'Hard Boiled Eggs and Fruit', category: 'Breakfast', ingredients: ['2 large hard-boiled eggs', '1 orange'], instructions: ['Peel and eat eggs.', 'Serve with a fresh orange.'], prepTime: 1, cookTime: 12, nutritionalInfo: { carbs: '15g', sugar: '12g', sodium: '140mg', protein: '12g' } },
    { id: 'b22', name: 'Kefir with Sliced Almonds', category: 'Breakfast', ingredients: ['1 cup plain kefir', '2 tbsp sliced almonds'], instructions: ['Pour kefir in a bowl and top with almonds.'], prepTime: 2, cookTime: 0, nutritionalInfo: { carbs: '15g', sugar: '12g', sodium: '130mg', protein: '12g' } },
    { id: 'b23', name: 'Breakfast Quesadilla', category: 'Breakfast', ingredients: ['1 small whole wheat tortilla', '1 scrambled egg', '2 tbsp shredded cheese', '1 tbsp black beans'], instructions: ['Place egg, cheese, and beans on one half of the tortilla.', 'Fold and cook in a pan until golden.'], prepTime: 3, cookTime: 5, nutritionalInfo: { carbs: '25g', sugar: '1g', sodium: '450mg', protein: '15g' } },
    { id: 'b24', name: 'Peach and Ginger Smoothie', category: 'Breakfast', ingredients: ['1 cup sliced peaches', '1 tsp grated ginger', '1/2 cup plain yogurt', '1/2 cup water'], instructions: ['Blend all ingredients until smooth.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '28g', sugar: '22g', sodium: '70mg', protein: '8g' } },
    { id: 'b25', name: 'Buckwheat Groats with Walnuts', category: 'Breakfast', ingredients: ['1/2 cup cooked buckwheat groats', '2 tbsp chopped walnuts', 'A drizzle of honey'], instructions: ['Serve warm buckwheat topped with walnuts and a small drizzle of honey.'], prepTime: 2, cookTime: 15, nutritionalInfo: { carbs: '40g', sugar: '8g', sodium: '10mg', protein: '8g' } },
    { id: 'b26', name: 'Tomato and Basil Frittata Muffin', category: 'Breakfast', ingredients: ['2 eggs', '3 cherry tomatoes, chopped', 'Fresh basil', '1 tbsp parmesan'], instructions: ['Whisk eggs and stir in other ingredients.', 'Pour into a muffin tin.', 'Bake at 375°F for 15-20 minutes.'], prepTime: 5, cookTime: 20, nutritionalInfo: { carbs: '3g', sugar: '2g', sodium: '250mg', protein: '14g' } },
    { id: 'b27', name: 'Pumpkin Spice Yogurt', category: 'Breakfast', ingredients: ['1 cup plain Greek yogurt', '2 tbsp pumpkin puree', '1/4 tsp pumpkin pie spice'], instructions: ['Stir all ingredients together in a bowl.'], prepTime: 3, cookTime: 0, nutritionalInfo: { carbs: '15g', sugar: '10g', sodium: '90mg', protein: '22g' } },
    { id: 'b28', name: 'Almond Flour Waffle', category: 'Breakfast', ingredients: ['1/2 cup almond flour', '1 egg', '2 tbsp almond milk', '1/2 tsp baking powder'], instructions: ['Mix ingredients to form a batter.', 'Cook in a waffle iron.'], prepTime: 5, cookTime: 5, nutritionalInfo: { carbs: '10g', sugar: '2g', sodium: '200mg', protein: '12g' } },
    { id: 'b29', name: 'Cantaloupe with Cottage Cheese', category: 'Breakfast', ingredients: ['1 cup cubed cantaloupe', '1/2 cup cottage cheese'], instructions: ['Serve cottage cheese with a side of fresh cantaloupe.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '18g', sugar: '15g', sodium: '460mg', protein: '15g' } },
    { id: 'b30', name: 'Overnight Oats with Peanut Butter', category: 'Breakfast', ingredients: ['1/2 cup rolled oats', '1/2 cup almond milk', '1 tbsp peanut butter', '1 tbsp chia seeds'], instructions: ['Combine all ingredients in a jar.', 'Shake well and refrigerate overnight.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '40g', sugar: '8g', sodium: '180mg', protein: '15g' } },

  // Lunch
  {
    id: 'l1',
    name: 'Quinoa Salad with Chickpeas',
    category: 'Lunch',
    ingredients: ['1 cup cooked quinoa', '1/2 cup chickpeas', 'Cucumber', 'Cherry tomatoes', 'Feta cheese', 'Lemon vinaigrette'],
    instructions: ['Combine quinoa, chickpeas, cucumber, and tomatoes.', 'Top with feta and vinaigrette.'],
    prepTime: 10,
    cookTime: 0,
    nutritionalInfo: { carbs: '45g', sugar: '5g', sodium: '300mg', protein: '18g' },
  },
  {
    id: 'l2',
    name: 'Grilled Chicken Salad',
    category: 'Lunch',
    ingredients: ['4 oz grilled chicken breast', 'Mixed greens', '1/4 avocado', 'Vinaigrette dressing'],
    instructions: ['Slice chicken.', 'Toss with greens, avocado, and dressing.'],
    prepTime: 5,
    cookTime: 10,
    nutritionalInfo: { carbs: '10g', sugar: '3g', sodium: '250mg', protein: '35g' },
  },
  {
    id: 'l3',
    name: 'Lentil Soup',
    category: 'Lunch',
    ingredients: ['1 cup brown lentils', '1 carrot', '1 celery stalk', '4 cups vegetable broth'],
    instructions: ['Sauté chopped vegetables.', 'Add lentils and broth.', 'Simmer for 30 minutes.'],
    prepTime: 10,
    cookTime: 30,
    nutritionalInfo: { carbs: '40g', sugar: '8g', sodium: '600mg', protein: '20g' },
  },
    { id: 'l4', name: 'Tuna Salad Sandwich', category: 'Lunch', ingredients: ['1 can tuna in water', '2 tbsp Greek yogurt', '1 celery stalk', '2 slices whole wheat bread'], instructions: ['Mix tuna, yogurt, and chopped celery.', 'Serve on bread.'], prepTime: 10, cookTime: 0, nutritionalInfo: { carbs: '30g', sugar: '6g', sodium: '500mg', protein: '25g' } },
    { id: 'l5', name: 'Turkey and Cheese Wrap', category: 'Lunch', ingredients: ['3 slices turkey breast', '1 slice provolone cheese', '1 whole wheat tortilla', 'Lettuce and tomato'], instructions: ['Layer ingredients on tortilla and roll up.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '25g', sugar: '3g', sodium: '800mg', protein: '20g' } },
    { id: 'l6', name: 'Black Bean Burger', category: 'Lunch', ingredients: ['1 black bean patty', '1 whole wheat bun', 'Lettuce, tomato, onion'], instructions: ['Cook patty.', 'Serve on bun with toppings.'], prepTime: 5, cookTime: 8, nutritionalInfo: { carbs: '45g', sugar: '7g', sodium: '600mg', protein: '15g' } },
    { id: 'l7', name: 'Caprese Salad', category: 'Lunch', ingredients: ['1 large tomato', '4 oz fresh mozzarella', 'Fresh basil', 'Balsamic glaze'], instructions: ['Alternate slices of tomato and mozzarella.', 'Top with basil and glaze.'], prepTime: 10, cookTime: 0, nutritionalInfo: { carbs: '10g', sugar: '8g', sodium: '400mg', protein: '20g' } },
    { id: 'l8', name: 'Leftover Salmon Salad', category: 'Lunch', ingredients: ['4 oz cooked salmon', 'Mixed greens', 'Cucumber', 'Lemon juice'], instructions: ['Flake salmon over greens.', 'Add cucumber and a squeeze of lemon.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '5g', sugar: '2g', sodium: '200mg', protein: '25g' } },
    { id: 'l9', name: 'Vegetable Stir-fry with Tofu', category: 'Lunch', ingredients: ['1/2 block tofu', '1 cup mixed vegetables (broccoli, peppers)', '1 tbsp soy sauce'], instructions: ['Stir-fry tofu and vegetables.', 'Add soy sauce.'], prepTime: 10, cookTime: 10, nutritionalInfo: { carbs: '20g', sugar: '8g', sodium: '500mg', protein: '20g' } },
    { id: 'l10', name: 'Chicken Noodle Soup', category: 'Lunch', ingredients: ['1 cup cooked chicken', '1/2 cup egg noodles', '4 cups chicken broth', 'Carrots and celery'], instructions: ['Simmer ingredients until noodles and vegetables are tender.'], prepTime: 10, cookTime: 20, nutritionalInfo: { carbs: '25g', sugar: '5g', sodium: '700mg', protein: '15g' } },
    { id: 'l11', name: 'Greek Salad with Grilled Shrimp', category: 'Lunch', ingredients: ['4 oz grilled shrimp', 'Romaine lettuce', 'Cucumber', 'Olives', 'Feta cheese', 'Vinaigrette'], instructions: ['Toss all ingredients together.'], prepTime: 15, cookTime: 5, nutritionalInfo: { carbs: '12g', sugar: '6g', sodium: '700mg', protein: '25g' } },
    { id: 'l12', name: 'Egg Salad Lettuce Wraps', category: 'Lunch', ingredients: ['2 hard-boiled eggs, chopped', '2 tbsp Greek yogurt', '1 tsp Dijon mustard', 'Large lettuce leaves'], instructions: ['Mix eggs, yogurt, and mustard.', 'Serve scoops in lettuce leaves.'], prepTime: 10, cookTime: 0, nutritionalInfo: { carbs: '4g', sugar: '3g', sodium: '250mg', protein: '14g' } },
    { id: 'l13', name: 'Tomato Basil Soup', category: 'Lunch', ingredients: ['1 can diced tomatoes', '1/2 cup vegetable broth', 'Fresh basil leaves', '1 tbsp olive oil'], instructions: ['Simmer tomatoes and broth for 15 minutes.', 'Blend with basil and olive oil until smooth.'], prepTime: 5, cookTime: 15, nutritionalInfo: { carbs: '20g', sugar: '14g', sodium: '550mg', protein: '4g' } },
    { id: 'l14', name: 'Avocado and White Bean Salad', category: 'Lunch', ingredients: ['1/2 avocado, diced', '1/2 cup cannellini beans', '1/4 red onion, finely chopped', 'Lemon juice'], instructions: ['Gently toss all ingredients together.'], prepTime: 10, cookTime: 0, nutritionalInfo: { carbs: '30g', sugar: '2g', sodium: '200mg', protein: '10g' } },
    { id: 'l15', name: 'Cottage Cheese and Tomato Bowl', category: 'Lunch', ingredients: ['1 cup cottage cheese', '1/2 cup cherry tomatoes, halved', 'Freshly ground black pepper'], instructions: ['Combine cottage cheese and tomatoes in a bowl and season with pepper.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '12g', sugar: '9g', sodium: '500mg', protein: '28g' } },
    { id: 'l16', name: 'Sardine and Avocado Toast', category: 'Lunch', ingredients: ['1 slice Ezekiel bread, toasted', '1 can sardines in olive oil, mashed', '1/4 avocado'], instructions: ['Spread mashed sardines and avocado on toast.'], prepTime: 5, cookTime: 2, nutritionalInfo: { carbs: '18g', sugar: '1g', sodium: '350mg', protein: '20g' } },
    { id: 'l17', name: 'Simple Cucumber Salad', category: 'Lunch', ingredients: ['1 large cucumber, thinly sliced', '2 tbsp rice vinegar', '1 tbsp sesame oil', 'Sesame seeds'], instructions: ['Toss cucumber with vinegar and oil.', 'Garnish with sesame seeds.'], prepTime: 8, cookTime: 0, nutritionalInfo: { carbs: '8g', sugar: '4g', sodium: '15mg', protein: '2g' } },
    { id: 'l18', name: 'Roast Beef and Swiss Roll-ups', category: 'Lunch', ingredients: ['4 slices roast beef', '2 slices Swiss cheese'], instructions: ['Lay out roast beef slices, top with cheese, and roll up tightly.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '2g', sugar: '1g', sodium: '600mg', protein: '22g' } },
    { id: 'l19', name: 'Cold Soba Noodle Salad', category: 'Lunch', ingredients: ['1 bundle soba noodles, cooked and cooled', '1/2 cup shelled edamame', 'Scallions, chopped', 'Soy-ginger dressing'], instructions: ['Toss cold noodles with edamame, scallions, and dressing.'], prepTime: 5, cookTime: 10, nutritionalInfo: { carbs: '50g', sugar: '6g', sodium: '500mg', protein: '20g' } },
    { id: 'l20', name: 'Open-Faced Chicken Salad Sandwich', category: 'Lunch', ingredients: ['1 slice rye bread', '1/2 cup cooked chicken, shredded', '2 tbsp plain yogurt', 'Chopped celery'], instructions: ['Mix chicken, yogurt, and celery.', 'Spread on a slice of toasted rye bread.'], prepTime: 10, cookTime: 2, nutritionalInfo: { carbs: '25g', sugar: '4g', sodium: '400mg', protein: '20g' } },
    { id: 'l21', name: 'Minestrone Soup', category: 'Lunch', ingredients: ['Mixed vegetables (carrots, celery, zucchini)', '1/2 cup kidney beans', '1/2 cup small pasta', '4 cups vegetable broth'], instructions: ['Simmer vegetables, beans, and broth until tender.', 'Add pasta and cook until al dente.'], prepTime: 15, cookTime: 25, nutritionalInfo: { carbs: '40g', sugar: '10g', sodium: '700mg', protein: '15g' } },
    { id: 'l22', name: 'Three-Bean Salad', category: 'Lunch', ingredients: ['1/4 cup each of kidney, garbanzo, and green beans', '1/4 red onion, chopped', 'Light vinaigrette'], instructions: ['Combine all beans and onion.', 'Toss with vinaigrette and chill.'], prepTime: 10, cookTime: 0, nutritionalInfo: { carbs: '35g', sugar: '8g', sodium: '300mg', protein: '12g' } },
    { id: 'l23', name: 'Spinach and Feta Stuffed Chicken', category: 'Lunch', ingredients: ['1 small chicken breast', '1/4 cup spinach', '2 tbsp feta cheese'], instructions: ['Butterfly the chicken breast.', 'Stuff with spinach and feta.', 'Bake at 375°F for 20-25 minutes.'], prepTime: 10, cookTime: 25, nutritionalInfo: { carbs: '3g', sugar: '1g', sodium: '400mg', protein: '30g' } },
    { id: 'l24', name: 'Smoked Turkey and Apple Slices', category: 'Lunch', ingredients: ['4 slices smoked turkey', '1/2 apple, sliced'], instructions: ['Serve turkey slices alongside fresh apple slices.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '15g', sugar: '12g', sodium: '700mg', protein: '18g' } },
    { id: 'l25', name: 'Broccoli Cheddar Soup', category: 'Lunch', ingredients: ['1 cup broccoli florets', '1/4 cup shredded cheddar', '1/2 cup milk', '1/2 cup chicken broth'], instructions: ['Steam broccoli until tender.', 'Blend with milk and broth.', 'Stir in cheese until melted.'], prepTime: 5, cookTime: 15, nutritionalInfo: { carbs: '15g', sugar: '8g', sodium: '600mg', protein: '12g' } },
    { id: 'l26', name: 'BLT Salad', category: 'Lunch', ingredients: ['2 cups romaine lettuce', '2 strips cooked bacon, crumbled', '1/4 cup cherry tomatoes', 'Ranch dressing'], instructions: ['Toss lettuce, bacon, and tomatoes with dressing.'], prepTime: 10, cookTime: 5, nutritionalInfo: { carbs: '10g', sugar: '6g', sodium: '500mg', protein: '10g' } },
    { id: 'l27', name: 'Shrimp and Avocado Ceviche', category: 'Lunch', ingredients: ['4 oz cooked shrimp, chopped', '1/2 avocado, diced', '1/4 cup diced onion and tomato', 'Lime juice'], instructions: ['Mix all ingredients.', 'Let marinate in lime juice for 10 minutes.'], prepTime: 15, cookTime: 0, nutritionalInfo: { carbs: '15g', sugar: '5g', sodium: '250mg', protein: '20g' } },
    { id: 'l28', name: 'Mushroom and Barley Soup', category: 'Lunch', ingredients: ['1/2 cup sliced mushrooms', '1/4 cup pearl barley', '4 cups beef or vegetable broth'], instructions: ['Sauté mushrooms.', 'Add barley and broth, simmer for 40-50 minutes until barley is tender.'], prepTime: 5, cookTime: 50, nutritionalInfo: { carbs: '35g', sugar: '4g', sodium: '650mg', protein: '8g' } },
    { id: 'l29', name: 'Pizza on English Muffin', category: 'Lunch', ingredients: ['1 whole wheat English muffin, split', '2 tbsp tomato sauce', '1/4 cup shredded mozzarella'], instructions: ['Top muffin halves with sauce and cheese.', 'Toast or bake until cheese is bubbly.'], prepTime: 3, cookTime: 8, nutritionalInfo: { carbs: '30g', sugar: '6g', sodium: '550mg', protein: '14g' } },
    { id: 'l30', name: 'Deconstructed Sushi Bowl', category: 'Lunch', ingredients: ['1/2 cup cooked brown rice', '2 oz smoked salmon', 'Diced cucumber and avocado', 'Soy sauce'], instructions: ['Layer rice, salmon, cucumber, and avocado in a bowl.', 'Drizzle with soy sauce.'], prepTime: 10, cookTime: 0, nutritionalInfo: { carbs: '45g', sugar: '4g', sodium: '500mg', protein: '18g' } },

  // Dinner
  {
    id: 'd1',
    name: 'Lemon Herb Baked Salmon',
    category: 'Dinner',
    ingredients: ['Salmon fillet', '1 lemon', 'Fresh dill', 'Olive oil', 'Salt', 'Pepper'],
    instructions: ['Preheat oven to 400°F.', 'Season salmon with oil, dill, salt, and pepper.', 'Top with lemon slices and bake for 12-15 mins.'],
    prepTime: 5,
    cookTime: 15,
    nutritionalInfo: { carbs: '2g', sugar: '1g', sodium: '150mg', protein: '40g' },
  },
  {
    id: 'd2',
    name: 'Sheet Pan Chicken and Veggies',
    category: 'Dinner',
    ingredients: ['1 chicken breast', 'Broccoli florets', 'Bell pepper strips', 'Olive oil', 'Italian seasoning'],
    instructions: ['Toss chicken and veggies with oil and seasoning.', 'Roast at 400°F for 20-25 mins.'],
    prepTime: 10,
    cookTime: 25,
    nutritionalInfo: { carbs: '15g', sugar: '7g', sodium: '200mg', protein: '30g' },
  },
  {
    id: 'd3',
    name: 'Spaghetti with Turkey Meatballs',
    category: 'Dinner',
    ingredients: ['1 serving whole wheat spaghetti', '4 turkey meatballs', '1/2 cup marinara sauce'],
    instructions: ['Cook spaghetti.', 'Heat meatballs in marinara sauce.', 'Serve meatballs over spaghetti.'],
    prepTime: 5,
    cookTime: 20,
    nutritionalInfo: { carbs: '50g', sugar: '12g', sodium: '700mg', protein: '30g' },
  },
    { id: 'd4', name: 'Beef and Broccoli', category: 'Dinner', ingredients: ['4 oz sirloin steak', '1 cup broccoli florets', '2 tbsp soy sauce', '1 tsp ginger'], instructions: ['Slice and cook steak.', 'Add broccoli and stir-fry.', 'Add sauce and ginger.'], prepTime: 15, cookTime: 10, nutritionalInfo: { carbs: '12g', sugar: '5g', sodium: '600mg', protein: '35g' } },
    { id: 'd5', name: 'Baked Cod with Asparagus', category: 'Dinner', ingredients: ['6 oz cod fillet', '1 bunch asparagus', '1 lemon', 'Olive oil'], instructions: ['Toss asparagus with olive oil.', 'Place cod and asparagus on a baking sheet.', 'Top with lemon slices.', 'Bake at 400°F for 15 mins.'], prepTime: 5, cookTime: 15, nutritionalInfo: { carbs: '10g', sugar: '4g', sodium: '180mg', protein: '35g' } },
    { id: 'd6', name: 'Chicken and Vegetable Skewers', category: 'Dinner', ingredients: ['1 chicken breast, cubed', 'Cherry tomatoes', 'Zucchini chunks', 'Onion pieces'], instructions: ['Thread chicken and veggies onto skewers.', 'Grill or bake until chicken is cooked.'], prepTime: 15, cookTime: 15, nutritionalInfo: { carbs: '10g', sugar: '6g', sodium: '150mg', protein: '28g' } },
    { id: 'd7', name: 'Stuffed Bell Peppers', category: 'Dinner', ingredients: ['2 bell peppers', '1/2 cup cooked ground turkey', '1/4 cup cooked brown rice', '2 tbsp tomato sauce'], instructions: ['Cut peppers in half and remove seeds.', 'Mix turkey, rice, and sauce.', 'Stuff peppers and bake at 375°F for 25 mins.'], prepTime: 10, cookTime: 30, nutritionalInfo: { carbs: '25g', sugar: '10g', sodium: '400mg', protein: '20g' } },
    { id: 'd8', name: 'Pork Chops with Roasted Apples', category: 'Dinner', ingredients: ['1 boneless pork chop', '1/2 apple, sliced', '1 tsp cinnamon', 'Olive oil'], instructions: ['Sear pork chop.', 'In the same pan, cook apple slices with cinnamon.', 'Serve apples over pork chop.'], prepTime: 5, cookTime: 15, nutritionalInfo: { carbs: '15g', sugar: '12g', sodium: '100mg', protein: '30g' } },
    { id: 'd9', name: 'Shrimp Scampi with Zucchini Noodles', category: 'Dinner', ingredients: ['5 oz shrimp', '2 zucchini, spiralized', '2 cloves garlic', '1 tbsp olive oil', 'Lemon juice'], instructions: ['Sauté garlic in olive oil.', 'Add shrimp and cook through.', 'Toss with zucchini noodles and lemon juice.'], prepTime: 10, cookTime: 8, nutritionalInfo: { carbs: '15g', sugar: '8g', sodium: '300mg', protein: '25g' } },
    { id: 'd10', name: 'Vegetarian Chili', category: 'Dinner', ingredients: ['1/2 cup kidney beans', '1/2 cup black beans', '1/2 cup canned tomatoes', 'Chili powder'], instructions: ['Combine all ingredients in a pot.', 'Simmer for at least 30 minutes.'], prepTime: 5, cookTime: 30, nutritionalInfo: { carbs: '50g', sugar: '10g', sodium: '700mg', protein: '15g' } },
    { id: 'd11', name: 'Shepherds Pie with Cauliflower Mash', category: 'Dinner', ingredients: ['1 lb lean ground turkey', '1 cup mixed vegetables', '1 head cauliflower, steamed and mashed', 'Beef broth'], instructions: ['Brown the turkey and add vegetables.', 'Top with cauliflower mash.', 'Bake at 375°F for 20 minutes.'], prepTime: 20, cookTime: 30, nutritionalInfo: { carbs: '20g', sugar: '10g', sodium: '500mg', protein: '40g' } },
    { id: 'd12', name: 'Lemon Dill Chicken', category: 'Dinner', ingredients: ['1 chicken breast', '1 lemon, juiced', '1 tbsp fresh dill', '1 tbsp olive oil'], instructions: ['Marinate chicken in lemon juice, dill, and olive oil.', 'Bake or grill until cooked through.'], prepTime: 15, cookTime: 20, nutritionalInfo: { carbs: '5g', sugar: '2g', sodium: '150mg', protein: '35g' } },
    { id: 'd13', name: 'Tuna Patties', category: 'Dinner', ingredients: ['1 can tuna', '1 egg', '2 tbsp almond flour', 'Herbs of choice'], instructions: ['Mix all ingredients.', 'Form into patties and pan-fry until golden brown.'], prepTime: 10, cookTime: 8, nutritionalInfo: { carbs: '5g', sugar: '1g', sodium: '300mg', protein: '25g' } },
    { id: 'd14', name: 'Ratatouille', category: 'Dinner', ingredients: ['Eggplant, Zucchini, Bell peppers, Tomato', 'Onion and garlic', 'Olive oil'], instructions: ['Sauté onion and garlic.', 'Layer sliced vegetables in a baking dish, drizzle with oil.', 'Bake at 375°F for 45-60 minutes.'], prepTime: 20, cookTime: 60, nutritionalInfo: { carbs: '25g', sugar: '15g', sodium: '50mg', protein: '5g' } },
    { id: 'd15', name: 'Cauliflower Crust Pizza', category: 'Dinner', ingredients: ['1 cauliflower head, riced', '1 egg', '1/4 cup mozzarella', 'Tomato sauce and toppings'], instructions: ['Mix riced cauliflower with egg and half the cheese.', 'Form crust and bake.', 'Add sauce, cheese, and toppings, then bake again.'], prepTime: 20, cookTime: 25, nutritionalInfo: { carbs: '15g', sugar: '8g', sodium: '450mg', protein: '20g' } },
    { id: 'd16', name: 'Blackened Tilapia', category: 'Dinner', ingredients: ['1 tilapia fillet', '1 tbsp blackening seasoning', '1 tbsp olive oil'], instructions: ['Coat tilapia with seasoning.', 'Pan-sear in olive oil for 3-4 minutes per side.'], prepTime: 5, cookTime: 8, nutritionalInfo: { carbs: '1g', sugar: '0g', sodium: '400mg', protein: '30g' } },
    { id: 'd17', name: 'Chicken Cacciatore', category: 'Dinner', ingredients: ['1 chicken breast', '1/2 cup mushrooms', '1/2 cup bell peppers', '1/2 cup tomato sauce'], instructions: ['Sear chicken.', 'Sauté vegetables.', 'Add back chicken and sauce, simmer for 20 minutes.'], prepTime: 10, cookTime: 30, nutritionalInfo: { carbs: '18g', sugar: '12g', sodium: '600mg', protein: '35g' } },
    { id: 'd18', name: 'Lentil Loaf', category: 'Dinner', ingredients: ['2 cups cooked lentils', '1/2 cup breadcrumbs', '1 egg', 'Chopped onions and carrots'], instructions: ['Mash lentils and mix with other ingredients.', 'Form into a loaf and bake at 350°F for 45 minutes.'], prepTime: 15, cookTime: 45, nutritionalInfo: { carbs: '55g', sugar: '10g', sodium: '300mg', protein: '25g' } },
    { id: 'd19', name: 'Sausage and Peppers', category: 'Dinner', ingredients: ['2 links Italian chicken sausage', '1 sliced bell pepper', '1/2 sliced onion'], instructions: ['Sauté sausage, peppers, and onion until cooked through.'], prepTime: 10, cookTime: 20, nutritionalInfo: { carbs: '15g', sugar: '8g', sodium: '700mg', protein: '25g' } },
    { id: 'd20', name: 'Eggplant Parmesan', category: 'Dinner', ingredients: ['1 small eggplant, sliced', '1/2 cup marinara sauce', '1/4 cup mozzarella cheese'], instructions: ['Bake or grill eggplant slices.', 'Layer with sauce and cheese in a baking dish.', 'Bake until bubbly.'], prepTime: 15, cookTime: 30, nutritionalInfo: { carbs: '25g', sugar: '15g', sodium: '550mg', protein: '15g' } },
    { id: 'd21', name: 'Garlic Herb Roasted Chicken Thighs', category: 'Dinner', ingredients: ['2 chicken thighs', '3 cloves garlic, minced', '1 tbsp mixed herbs (rosemary, thyme)', 'Olive oil'], instructions: ['Rub chicken with garlic, herbs, and oil.', 'Roast at 400°F for 25-30 minutes.'], prepTime: 10, cookTime: 30, nutritionalInfo: { carbs: '2g', sugar: '0g', sodium: '200mg', protein: '30g' } },
    { id: 'd22', name: 'Vegetable Curry', category: 'Dinner', ingredients: ['2 cups mixed vegetables (cauliflower, peas, carrots)', '1/2 cup coconut milk', '1 tbsp curry powder'], instructions: ['Simmer vegetables in coconut milk with curry powder until tender.'], prepTime: 10, cookTime: 20, nutritionalInfo: { carbs: '25g', sugar: '12g', sodium: '100mg', protein: '8g' } },
    { id: 'd23', name: 'Turkey Burgers on Lettuce', category: 'Dinner', ingredients: ['4 oz ground turkey patty', 'Large lettuce leaf for bun', 'Tomato and onion slices'], instructions: ['Grill or pan-fry turkey patty.', 'Serve on a lettuce leaf with desired toppings.'], prepTime: 5, cookTime: 10, nutritionalInfo: { carbs: '5g', sugar: '3g', sodium: '250mg', protein: '28g' } },
    { id: 'd24', name: 'Poached Cod in Tomato Broth', category: 'Dinner', ingredients: ['6 oz cod fillet', '1 cup canned diced tomatoes', 'Herbs (basil, oregano)'], instructions: ['Bring tomatoes and herbs to a simmer in a pan.', 'Gently place cod in the broth and poach for 8-10 minutes.'], prepTime: 5, cookTime: 15, nutritionalInfo: { carbs: '10g', sugar: '8g', sodium: '400mg', protein: '35g' } },
    { id: 'd25', name: 'Zucchini Boats', category: 'Dinner', ingredients: ['2 medium zucchini', '1/2 cup lean ground beef, cooked', '2 tbsp tomato sauce', '1/4 cup shredded cheese'], instructions: ['Halve zucchini and scoop out flesh.', 'Mix flesh with beef and sauce.', 'Refill boats, top with cheese, and bake at 375°F for 20 minutes.'], prepTime: 15, cookTime: 25, nutritionalInfo: { carbs: '12g', sugar: '8g', sodium: '450mg', protein: '25g' } },
    { id: 'd26', name: 'Mushroom Risotto (with brown rice)', category: 'Dinner', ingredients: ['1/2 cup Arborio brown rice', '1 cup sliced mushrooms', '3 cups vegetable broth, warm', '1/4 cup Parmesan cheese'], instructions: ['Sauté mushrooms.', 'Toast rice, then gradually add warm broth, stirring constantly.', 'Stir in Parmesan at the end.'], prepTime: 10, cookTime: 45, nutritionalInfo: { carbs: '50g', sugar: '4g', sodium: '700mg', protein: '15g' } },
    { id: 'd27', name: 'Foil-Packet Lemon Herb White Fish', category: 'Dinner', ingredients: ['1 white fish fillet (e.g., flounder)', '1/2 lemon, sliced', 'Zucchini ribbons', 'Fresh thyme sprigs'], instructions: ['Place fish and vegetables on a sheet of foil.', 'Top with lemon and thyme.', 'Seal packet and bake at 400°F for 15-20 minutes.'], prepTime: 10, cookTime: 20, nutritionalInfo: { carbs: '8g', sugar: '4g', sodium: '180mg', protein: '28g' } },
    { id: 'd28', name: 'Unstuffed Cabbage Rolls', category: 'Dinner', ingredients: ['1/2 lb lean ground turkey', '1/2 head cabbage, chopped', '1 can diced tomatoes, undrained', '1/4 cup brown rice'], instructions: ['Brown turkey, then add cabbage and cook until wilted.', 'Stir in tomatoes and uncooked rice.', 'Simmer for 25-30 minutes until rice is cooked.'], prepTime: 10, cookTime: 40, nutritionalInfo: { carbs: '30g', sugar: '15g', sodium: '500mg', protein: '30g' } },
    { id: 'd29', name: 'Rosemary Roasted Pork Tenderloin', category: 'Dinner', ingredients: ['1 lb pork tenderloin', '2 tbsp fresh rosemary, chopped', '2 cloves garlic, minced', 'Olive oil'], instructions: ['Rub pork with rosemary, garlic, and oil.', 'Roast at 400°F for 20-25 minutes, or until internal temperature reaches 145°F.'], prepTime: 10, cookTime: 25, nutritionalInfo: { carbs: '1g', sugar: '0g', sodium: '150mg', protein: '45g' } },
    { id: 'd30', name: 'Simple Salmon Chowder', category: 'Dinner', ingredients: ['4 oz cooked salmon, flaked', '1/2 cup diced potatoes', '1/4 cup diced celery and carrots', '1 cup milk'], instructions: ['Boil vegetables until tender.', 'Reduce heat, add milk and salmon.', 'Warm through gently without boiling.'], prepTime: 15, cookTime: 20, nutritionalInfo: { carbs: '25g', sugar: '10g', sodium: '300mg', protein: '28g' } },

  // Snacks
  {
    id: 's1',
    name: 'Greek Yogurt with Berries',
    category: 'Snacks',
    ingredients: ['1 cup Greek yogurt', '1/2 cup mixed berries', '1 tbsp chopped nuts'],
    instructions: ['Combine yogurt, berries, and nuts in a bowl.'],
    prepTime: 3,
    cookTime: 0,
    nutritionalInfo: { carbs: '15g', sugar: '10g', sodium: '80mg', protein: '20g' },
  },
  {
    id: 's2',
    name: 'Apple Slices with Peanut Butter',
    category: 'Snacks',
    ingredients: ['1 medium apple', '2 tbsp peanut butter'],
    instructions: ['Slice the apple and serve with peanut butter.'],
    prepTime: 5,
    cookTime: 0,
    nutritionalInfo: { carbs: '30g', sugar: '20g', sodium: '150mg', protein: '8g' },
  },
  {
    id: 's3',
    name: 'Handful of Almonds',
    category: 'Snacks',
    ingredients: ['1/4 cup raw almonds'],
    instructions: ['Enjoy a handful of almonds.'],
    prepTime: 1,
    cookTime: 0,
    nutritionalInfo: { carbs: '7g', sugar: '1g', sodium: '0mg', protein: '7g' },
  },
    { id: 's4', name: 'Hard-Boiled Egg', category: 'Snacks', ingredients: ['1 large egg'], instructions: ['Boil egg for 10-12 minutes.'], prepTime: 1, cookTime: 12, nutritionalInfo: { carbs: '1g', sugar: '1g', sodium: '70mg', protein: '6g' } },
    { id: 's5', name: 'Celery Sticks with Cream Cheese', category: 'Snacks', ingredients: ['2 celery stalks', '2 tbsp cream cheese'], instructions: ['Spread cream cheese on celery.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '4g', sugar: '2g', sodium: '200mg', protein: '3g' } },
    { id: 's6', name: 'Baby Carrots with Hummus', category: 'Snacks', ingredients: ['1 cup baby carrots', '1/4 cup hummus'], instructions: ['Serve carrots with hummus for dipping.'], prepTime: 3, cookTime: 0, nutritionalInfo: { carbs: '20g', sugar: '8g', sodium: '300mg', protein: '5g' } },
    { id: 's7', name: 'A Pear', category: 'Snacks', ingredients: ['1 medium pear'], instructions: ['Wash and eat.'], prepTime: 1, cookTime: 0, nutritionalInfo: { carbs: '25g', sugar: '17g', sodium: '0mg', protein: '1g' } },
    { id: 's8', name: 'String Cheese', category: 'Snacks', ingredients: ['1 stick of mozzarella string cheese'], instructions: ['Unwrap and enjoy.'], prepTime: 1, cookTime: 0, nutritionalInfo: { carbs: '1g', sugar: '0g', sodium: '200mg', protein: '7g' } },
    { id: 's9', name: 'Small Bowl of Olives', category: 'Snacks', ingredients: ['1/4 cup mixed olives'], instructions: ['Serve in a small bowl.'], prepTime: 2, cookTime: 0, nutritionalInfo: { carbs: '2g', sugar: '0g', sodium: '400mg', protein: '0.5g' } },
    { id: 's10', name: 'Edamame (Steamed)', category: 'Snacks', ingredients: ['1/2 cup shelled edamame', 'Pinch of salt'], instructions: ['Steam edamame for 5-7 minutes.', 'Sprinkle with salt.'], prepTime: 2, cookTime: 7, nutritionalInfo: { carbs: '10g', sugar: '3g', sodium: '150mg', protein: '11g' } },
    { id: 's11', name: 'Cottage Cheese with Cantaloupe', category: 'Snacks', ingredients: ['1/2 cup cottage cheese', '1/2 cup cubed cantaloupe'], instructions: ['Mix cottage cheese and cantaloupe together.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '10g', sugar: '8g', sodium: '400mg', protein: '14g' } },
    { id: 's12', name: 'A Handful of Walnuts', category: 'Snacks', ingredients: ['1/4 cup walnuts'], instructions: ['Enjoy a handful of walnuts.'], prepTime: 1, cookTime: 0, nutritionalInfo: { carbs: '4g', sugar: '1g', sodium: '0mg', protein: '4g' } },
    { id: 's13', name: 'Cucumber Slices with Dill Dip', category: 'Snacks', ingredients: ['1/2 cucumber, sliced', '1/4 cup Greek yogurt', '1 tsp fresh dill'], instructions: ['Mix yogurt and dill for a dip.', 'Serve with cucumber slices.'], prepTime: 8, cookTime: 0, nutritionalInfo: { carbs: '7g', sugar: '5g', sodium: '50mg', protein: '6g' } },
    { id: 's14', name: 'Beef Jerky', category: 'Snacks', ingredients: ['1 oz low-sodium beef jerky'], instructions: ['Choose a brand with minimal added sugars and nitrates.'], prepTime: 1, cookTime: 0, nutritionalInfo: { carbs: '3g', sugar: '2g', sodium: '450mg', protein: '12g' } },
    { id: 's15', name: 'Roasted Chickpeas', category: 'Snacks', ingredients: ['1/2 cup chickpeas, rinsed and dried', '1 tsp olive oil', 'Spices (paprika, garlic powder)'], instructions: ['Toss chickpeas with oil and spices.', 'Roast at 400°F for 20-25 minutes until crispy.'], prepTime: 5, cookTime: 25, nutritionalInfo: { carbs: '25g', sugar: '2g', sodium: '250mg', protein: '8g' } },
    { id: 's16', name: 'Bell Pepper Strips', category: 'Snacks', ingredients: ['1/2 bell pepper (any color), sliced'], instructions: ['Enjoy raw bell pepper strips.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '7g', sugar: '5g', sodium: '5mg', protein: '1g' } },
    { id: 's17', name: 'Cherry Tomatoes with Feta', category: 'Snacks', ingredients: ['1/2 cup cherry tomatoes', '2 tbsp crumbled feta cheese'], instructions: ['Toss tomatoes with feta.'], prepTime: 4, cookTime: 0, nutritionalInfo: { carbs: '6g', sugar: '4g', sodium: '250mg', protein: '4g' } },
    { id: 's18', name: 'Rice Cake with Avocado', category: 'Snacks', ingredients: ['1 plain rice cake', '1/4 avocado, mashed'], instructions: ['Spread mashed avocado on a rice cake.'], prepTime: 3, cookTime: 0, nutritionalInfo: { carbs: '12g', sugar: '0g', sodium: '40mg', protein: '2g' } },
    { id: 's19', name: 'Small Portion of Leftover Lean Protein', category: 'Snacks', ingredients: ['2-3 oz leftover grilled chicken or fish'], instructions: ['A great way to use leftovers for a protein boost.'], prepTime: 2, cookTime: 0, nutritionalInfo: { carbs: '0g', sugar: '0g', sodium: '100mg', protein: '20g' } },
    { id: 's20', name: 'Unsweetened Almond Milk', category: 'Snacks', ingredients: ['1 cup unsweetened almond milk'], instructions: ['A light and hydrating snack.'], prepTime: 1, cookTime: 0, nutritionalInfo: { carbs: '1g', sugar: '0g', sodium: '180mg', protein: '1g' } },
    { id: 's21', name: 'Small Orange', category: 'Snacks', ingredients: ['1 small orange'], instructions: ['Peel and enjoy.'], prepTime: 2, cookTime: 0, nutritionalInfo: { carbs: '12g', sugar: '9g', sodium: '0mg', protein: '1g' } },
    { id: 's22', name: 'Pistachios (in-shell)', category: 'Snacks', ingredients: ['1/4 cup in-shell pistachios'], instructions: ['The act of shelling them can promote mindful eating.'], prepTime: 1, cookTime: 0, nutritionalInfo: { carbs: '8g', sugar: '2g', sodium: '5mg', protein: '6g' } },
    { id: 's23', name: 'Sugar-Free Gelatin', category: 'Snacks', ingredients: ['1 serving of sugar-free gelatin'], instructions: ['Prepare according to package directions.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '0g', sugar: '0g', sodium: '50mg', protein: '2g' } },
    { id: 's24', name: 'Turkey Roll-Up', category: 'Snacks', ingredients: ['2 slices of turkey breast', '1 thin slice of cheese'], instructions: ['Roll the cheese up inside the turkey slices.'], prepTime: 3, cookTime: 0, nutritionalInfo: { carbs: '1g', sugar: '1g', sodium: '500mg', protein: '12g' } },
    { id: 's25', name: 'A Few Blackberries', category: 'Snacks', ingredients: ['1/2 cup blackberries'], instructions: ['Wash and enjoy this low-sugar fruit.'], prepTime: 2, cookTime: 0, nutritionalInfo: { carbs: '10g', sugar: '5g', sodium: '0mg', protein: '1g' } },
    { id: 's26', name: 'Chia Seed Drink', category: 'Snacks', ingredients: ['1 tbsp chia seeds', '1 cup water', 'Squeeze of lemon'], instructions: ['Stir chia seeds in water and let sit for 10 minutes.', 'Add lemon juice.'], prepTime: 2, cookTime: 0, nutritionalInfo: { carbs: '6g', sugar: '0g', sodium: '5mg', protein: '3g' } },
    { id: 's27', name: 'Pumpkin Seeds', category: 'Snacks', ingredients: ['2 tbsp roasted pumpkin seeds (pepitas)'], instructions: ['Enjoy a small handful of pumpkin seeds.'], prepTime: 1, cookTime: 0, nutritionalInfo: { carbs: '4g', sugar: '0g', sodium: '5mg', protein: '5g' } },
    { id: 's28', name: 'Seaweed Snacks', category: 'Snacks', ingredients: ['1 package of roasted seaweed snacks'], instructions: ['A savory, low-carb snack.'], prepTime: 1, cookTime: 0, nutritionalInfo: { carbs: '1g', sugar: '0g', sodium: '75mg', protein: '1g' } },
    { id: 's29', name: 'A Single Dill Pickle', category: 'Snacks', ingredients: ['1 medium dill pickle'], instructions: ['Great for a savory, crunchy craving.'], prepTime: 1, cookTime: 0, nutritionalInfo: { carbs: '4g', sugar: '2g', sodium: '800mg', protein: '0g' } },
    { id: 's30', name: 'Plain Greek Yogurt', category: 'Snacks', ingredients: ['1/2 cup plain, non-fat Greek yogurt'], instructions: ['A simple, protein-packed snack.'], prepTime: 2, cookTime: 0, nutritionalInfo: { carbs: '5g', sugar: '5g', sodium: '50mg', protein: '12g' } },
];


export const placeholderExercises: Exercise[] = [
  {
    id: 'ex1',
    name: 'Chair Squats',
    description: 'Stand in front of a sturdy chair. Lower your hips towards the chair as if you are about to sit, keeping your chest up. Lightly touch the chair before standing back up. Repeat 10-15 times.',
    category: 'Strength'
  },
  {
    id: 'ex2',
    name: 'Seated Leg Lifts',
    description: 'Sit tall in a chair. Extend one leg straight out in front of you, hold for 2-3 seconds, and then lower it slowly. Alternate legs. Do 10 repetitions for each leg.',
    category: 'Strength'
  },
  {
    id: 'ex3',
    name: 'Gentle Walking',
    description: 'Walk at a comfortable pace for 15-30 minutes. Focus on maintaining good posture. Choose a flat, even surface.',
    category: 'Cardio'
  },
    {
    id: 'ex4',
    name: 'Ankle Circles',
    description: 'While seated, lift one foot off the floor. Rotate your ankle slowly in a circular motion, 5 times clockwise and 5 times counter-clockwise. Switch to the other foot.',
    category: 'Flexibility'
  },
  {
    id: 'ex5',
    name: 'Wall Push-ups',
    description: 'Stand facing a wall, about arm\'s length away. Place your hands on the wall, slightly wider than your shoulders. Slowly bend your elbows and lower your chest towards the wall. Push back to the starting position. Repeat 10-12 times.',
    category: 'Strength'
  },
  {
    id: 'ex6',
    name: 'Seated Marching',
    description: 'Sit upright in a chair with your feet flat on the floor. Lift one knee up towards your chest, then lower it. Alternate legs, as if you are marching in place. Continue for 1-2 minutes.',
    category: 'Cardio'
  },
  {
    id: 'ex7',
    name: 'Arm Circles',
    description: 'Sit or stand tall. Extend your arms out to the sides at shoulder height. Make small circles forward for 15 seconds, then backward for 15 seconds.',
    category: 'Flexibility'
  },
  {
    id: 'ex8',
    name: 'Calf Raises',
    description: 'Stand straight, holding onto the back of a chair for support. Slowly raise your heels off the floor, so you are on your tiptoes. Hold for a moment, then slowly lower your heels. Repeat 10-15 times.',
    category: 'Strength'
  },
  {
    id: 'ex9',
    name: 'Seated Torso Twist',
    description: 'Sit in a chair with your feet flat on the floor. Cross your arms over your chest. Gently twist your upper body to one side, hold for 3 seconds, then return to center and twist to the other side. Repeat 5 times on each side.',
    category: 'Flexibility'
  },
  {
    id: 'ex10',
    name: 'Standing Side Leg Raise',
    description: 'Stand behind a chair, holding on for balance. Keeping your back straight, slowly lift one leg out to the side. Hold for a moment, then lower it. Do 10 repetitions for each leg.',
    category: 'Strength'
  },
  {
    id: 'ex11',
    name: 'Shoulder Rolls',
    description: 'Sit or stand tall. Gently roll your shoulders up towards your ears, then back and down. Repeat 5 times, then reverse the direction for 5 more rolls.',
    category: 'Flexibility'
  },
  {
    id: 'ex12',
    name: 'Heel-to-Toe Walk',
    description: 'Walk in a straight line, placing the heel of one foot directly in front of the toes of the other foot. Use a wall or countertop for support if needed. Take 10-15 steps.',
    category: 'Strength'
  },
  {
    id: 'ex13',
    name: 'Seated Hamstring Stretch',
    description: 'Sit on the edge of a chair. Extend one leg straight out in front of you with the heel on the floor. Gently lean forward from your hips until you feel a stretch in the back of your leg. Hold for 20-30 seconds. Switch legs.',
    category: 'Flexibility'
  },
  {
    id: 'ex14',
    name: 'Seated Bicep Curls',
    description: 'Sit in a chair, holding a light weight or can of soup in each hand with palms facing forward. Bend your elbows and lift the weights toward your shoulders. Slowly lower them back down. Repeat 10-12 times.',
    category: 'Strength'
  },
  {
    id: 'ex15',
    name: 'Finger and Hand Stretches',
    description: 'Gently open and close your hands, stretching your fingers wide and then making a soft fist. Repeat 10 times. Then, touch each fingertip to your thumb. This helps maintain dexterity.',
    category: 'Flexibility'
  },
  {
    id: 'ex16',
    name: 'Single Leg Stance',
    description: 'Hold onto a sturdy chair for support. Lift one foot off the ground and try to balance on the other foot for 10-15 seconds. Switch legs. This improves balance.',
    category: 'Strength'
  },
  {
    id: 'ex17',
    name: 'Neck Stretches',
    description: 'Sit tall. Slowly tilt your head to one side, as if bringing your ear toward your shoulder, until you feel a gentle stretch. Hold for 15 seconds. Repeat on the other side. Do not roll your neck in a full circle.',
    category: 'Flexibility'
  },
  {
    id: 'ex18',
    name: 'Seated Row',
    description: 'Sit on the edge of a chair. Hold a resistance band with both hands, with the band looped around a stable object in front of you. Squeeze your shoulder blades together as you pull the band toward your chest. Repeat 10-12 times.',
    category: 'Strength'
  },
  {
    id: 'ex19',
    name: 'Water Aerobics',
    description: 'If you have access to a pool, walking or gentle exercises in the water are excellent for joints. The water supports your weight, reducing impact. Perform activities like walking, leg lifts, or arm movements for 15-20 minutes.',
    category: 'Cardio'
  },
  {
    id: 'ex20',
    name: 'Step-ups',
    description: 'Use a low, sturdy step or the bottom step of a staircase. Step up with your right foot, then your left. Step down with your right foot, then your left. Hold a handrail for support. Repeat 10 times, leading with each foot.',
    category: 'Strength'
  },
  {
    id: 'ex21',
    name: 'Chest Stretch',
    description: 'Sit or stand tall. Clasp your hands behind your back. Gently straighten your arms and lift your hands slightly until you feel a stretch across your chest. Hold for 20-30 seconds.',
    category: 'Flexibility'
  },
  {
    id: 'ex22',
    name: 'Glute Bridge',
    description: 'Lie on your back with your knees bent and feet flat on the floor. Slowly lift your hips off the floor until your body forms a straight line from your shoulders to your knees. Hold for a moment, then lower. Repeat 10 times.',
    category: 'Strength'
  },
  {
    id: 'ex23',
    name: 'Stationary Cycling',
    description: 'If you have a stationary bike, cycle at a low resistance for 15-20 minutes. This is a great non-impact cardio workout.',
    category: 'Cardio'
  },
  {
    id: 'ex24',
    name: 'Triceps Stretch',
    description: 'Sit or stand tall. Raise one arm overhead, then bend your elbow to let your hand fall behind your head. Use your other hand to gently pull the elbow until you feel a stretch. Hold for 20-30 seconds. Switch arms.',
    category: 'Flexibility'
  },
  {
    id: 'ex25',
    name: 'Seated Leg Press (with band)',
    description: 'Sit in a chair and loop a resistance band around one foot. Hold the ends of the band. Gently press your leg forward against the resistance until it is straight. Return to the starting position. Do 10 reps per leg.',
    category: 'Strength'
  },
  {
    id: 'ex26',
    name: 'Deep Breathing',
    description: 'Sit comfortably. Inhale slowly and deeply through your nose for a count of 4, feeling your belly expand. Hold for 2 seconds. Exhale slowly through your mouth for a count of 6. Repeat for 1-2 minutes to promote relaxation.',
    category: 'Flexibility'
  },
  {
    id: 'ex27',
    name: 'Pelvic Tilts',
    description: 'Lie on your back with knees bent. Gently flatten your lower back against the floor by tightening your stomach muscles. Hold for 5 seconds, then relax. This is great for lower back strength. Repeat 10 times.',
    category: 'Strength'
  },
  {
    id: 'ex28',
    name: 'Standing Quad Stretch',
    description: 'Stand behind a chair, holding on for support. Bend one knee and grab your ankle, gently pulling your heel towards your glute. Keep your knees together. Hold for 20-30 seconds. Switch legs.',
    category: 'Flexibility'
  },
  {
    id: 'ex29',
    name: 'Tai Chi',
    description: 'Consider joining a beginner Tai Chi class. It involves slow, graceful movements that are excellent for balance, flexibility, and stress reduction.',
    category: 'Cardio'
  },
  {
    id: 'ex30',
    name: 'Wall Sit',
    description: 'Stand with your back against a wall. Slowly walk your feet forward and slide your back down the wall until your knees are bent at a 45-degree angle. Hold for 15-30 seconds. Slide back up the wall.',
    category: 'Strength'
  }
];


export const placeholderMedications: Medication[] = [
    { id: 'med1', name: 'Metformin', dosage: '500mg', frequency: 'Twice a day', time: ['08:00', '20:00'], intervalHours: 12 },
    { id: 'med2', name: 'Lisinopril', dosage: '10mg', frequency: 'Once a day', time: ['08:00'], intervalHours: 24 },
    { id: 'med3', name: 'Atorvastatin', dosage: '20mg', frequency: 'Once a day', time: ['20:00'], intervalHours: 24 },
];


const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);


export const placeholderBpLog: BloodPressureLog[] = [
    { id: 'bp1', systolic: 122, diastolic: 81, notes: 'Morning reading', timestamp: yesterday},
    { id: 'bp2', systolic: 125, diastolic: 83, notes: 'After walk', timestamp: twoDaysAgo},
]

export const placeholderBsLog: BloodSugarLog[] = [
    { id: 'bs1', level: 98, readingTime: 'Fasting', timestamp: today},
    { id: 'bs2', level: 145, readingTime: 'After Lunch', timestamp: yesterday},
    { id: 'bs3', level: 105, readingTime: 'Before Dinner', timestamp: twoDaysAgo},
]

export const placeholderMoodLog: MoodLog[] = [
    { id: 'mood1', mood: 4, journalEntry: 'Felt good today, had a nice chat with my neighbor.', timestamp: yesterday },
    { id: 'mood2', mood: 3, journalEntry: 'A bit tired, hip was aching.', timestamp: twoDaysAgo },
]

export const bpDataForChart = [
    { date: 'Mon', systolic: 130, diastolic: 85 },
    { date: 'Tue', systolic: 128, diastolic: 82 },
    { date: 'Wed', systolic: 125, diastolic: 80 },
    { date: 'Thu', systolic: 122, diastolic: 78 },
    { date: 'Fri', systolic: 124, diastolic: 81 },
    { date: 'Sat', systolic: 120, diastolic: 79 },
    { date: 'Sun', systolic: 121, diastolic: 80 },
];

export const bsDataForChart = [
    { date: 'Mon', level: 110 },
    { date: 'Tue', level: 140 },
    { date: 'Wed', level: 120 },
    { date: 'Thu', level: 95 },
    { date: 'Fri', level: 130 },
    { date: 'Sat', level: 105 },
    { date: 'Sun', level: 100 },
];
