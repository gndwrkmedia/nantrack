
export interface Recipe {
  id: string;
  name: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  nutritionalInfo: {
    carbs: string;
    sugar: string;
    sodium: string;
    protein: string;
  };
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: 'Strength' | 'Cardio' | 'Flexibility';
}

export interface Medication {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    time: string[];
    intervalHours: number; // New: hours until next dose is due
}

export interface BloodPressureLog {
    id:string;
    systolic: number;
    diastolic: number;
    notes: string;
    timestamp: Date;
}

export interface BloodSugarLog {
    id: string;
    level: number;
    readingTime: 'Fasting' | 'Before Meal' | 'After Meal' | 'Other';
    timestamp: Date;
}

export interface MoodLog {
    id: string;
    mood: number; // 1-5 scale
    journalEntry: string;
    timestamp: Date;
}

export interface ActivityLog {
    id: string;
    exerciseId: string;
    exerciseName: string;
    duration: number; // in minutes
    effort: number; // 1-5 scale
    timestamp: Date;
}
