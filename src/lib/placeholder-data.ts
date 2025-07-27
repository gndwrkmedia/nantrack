
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
