import type { Recipe, Exercise, Medication, BloodPressureLog, BloodSugarLog, MoodLog } from './types';

export const placeholderRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Lemon Herb Baked Salmon',
    category: 'Dinner',
    ingredients: ['Salmon fillet', '1 lemon', 'Fresh dill', 'Olive oil', 'Salt', 'Pepper'],
    instructions: [
      'Preheat oven to 400°F (200°C).',
      'Place salmon on a baking sheet lined with parchment paper.',
      'Drizzle with olive oil, season with salt, pepper, and fresh dill.',
      'Top with lemon slices.',
      'Bake for 12-15 minutes, or until cooked through.',
    ],
    prepTime: 5,
    cookTime: 15,
    nutritionalInfo: { carbs: '2g', sugar: '1g', sodium: '150mg', protein: '40g' },
  },
  {
    id: '2',
    name: 'Avocado Toast with Egg',
    category: 'Breakfast',
    ingredients: ['1 slice whole-wheat bread', '1/2 avocado', '1 large egg', 'Red pepper flakes'],
    instructions: [
        'Toast the bread to your liking.',
        'While bread is toasting, cook egg as desired (fried or poached works well).',
        'Mash avocado and spread it on the toast.',
        'Top with the cooked egg and a sprinkle of red pepper flakes.'
    ],
    prepTime: 5,
    cookTime: 5,
    nutritionalInfo: { carbs: '20g', sugar: '1g', sodium: '200mg', protein: '15g' },
  },
  {
    id: '3',
    name: 'Quinoa Salad with Chickpeas',
    category: 'Lunch',
    ingredients: ['1 cup cooked quinoa', '1/2 cup chickpeas', 'Cucumber', 'Cherry tomatoes', 'Feta cheese', 'Lemon vinaigrette'],
    instructions: [
        'In a large bowl, combine cooked quinoa, chickpeas, chopped cucumber, and halved cherry tomatoes.',
        'Crumble feta cheese over the top.',
        'Drizzle with lemon vinaigrette and toss to combine.'
    ],
    prepTime: 10,
    cookTime: 0,
    nutritionalInfo: { carbs: '45g', sugar: '5g', sodium: '300mg', protein: '18g' },
  },
    {
    id: '4',
    name: 'Greek Yogurt with Berries',
    category: 'Snacks',
    ingredients: ['1 cup Greek yogurt', '1/2 cup mixed berries', '1 tbsp chopped nuts'],
    instructions: [
        'Spoon Greek yogurt into a bowl.',
        'Top with mixed berries and chopped nuts.'
    ],
    prepTime: 3,
    cookTime: 0,
    nutritionalInfo: { carbs: '15g', sugar: '10g', sodium: '80mg', protein: '20g' },
  },
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
    { id: 'med1', name: 'Metformin', dosage: '500mg', frequency: 'Twice a day', time: ['08:00', '20:00']},
    { id: 'med2', name: 'Lisinopril', dosage: '10mg', frequency: 'Once a day', time: ['08:00']},
    { id: 'med3', name: 'Atorvastatin', dosage: '20mg', frequency: 'Once a day', time: ['20:00']},
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
