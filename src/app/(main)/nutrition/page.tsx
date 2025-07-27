
'use client';

import React from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { placeholderRecipes } from '@/lib/placeholder-data';
import type { Recipe } from '@/lib/types';
import { Minus, Plus, GlassWater } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function NutritionPage() {
  const { toast } = useToast();
  const [waterCount, setWaterCount] = React.useState(3);

  const handleLogMeal = (mealName: string) => {
    toast({
      title: "Meal Logged!",
      description: `You've logged "${mealName}". Enjoy!`,
    });
  }

  const renderRecipeCard = (recipe: Recipe) => (
    <Dialog key={recipe.id}>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">{recipe.name}</CardTitle>
            <CardDescription className="text-base">Prep: {recipe.prepTime} min, Cook: {recipe.cookTime} min</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground text-base">Click to see recipe and nutritional info.</p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-3xl font-headline">{recipe.name}</DialogTitle>
          <DialogDescription className="text-base">Category: {recipe.category}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-muted p-3 rounded-lg">
                    <p className="font-bold text-base">Carbs</p>
                    <p className="text-lg">{recipe.nutritionalInfo.carbs}</p>
                </div>
                 <div className="bg-muted p-3 rounded-lg">
                    <p className="font-bold text-base">Sugar</p>
                    <p className="text-lg">{recipe.nutritionalInfo.sugar}</p>
                </div>
                 <div className="bg-muted p-3 rounded-lg">
                    <p className="font-bold text-base">Sodium</p>
                    <p className="text-lg">{recipe.nutritionalInfo.sodium}</p>
                </div>
                 <div className="bg-muted p-3 rounded-lg">
                    <p className="font-bold text-base">Protein</p>
                    <p className="text-lg">{recipe.nutritionalInfo.protein}</p>
                </div>
            </div>
          <div>
            <h3 className="font-bold text-xl mb-2">Ingredients</h3>
            <ul className="list-disc list-inside text-base space-y-1">
              {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-2">Instructions</h3>
            <ol className="list-decimal list-inside text-base space-y-2">
              {recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
            </ol>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" size="lg" onClick={() => handleLogMeal(recipe.name)}>Log This Meal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div>
      <PageHeader
        title="Nutrition & Meals"
        description="Discover diabetes-friendly recipes and track your hydration."
      />

        <div className="grid gap-6 mb-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                        <GlassWater className="h-8 w-8 text-primary"/>
                        Hydration Tracker
                    </CardTitle>
                    <CardDescription>Aim for at least 8 glasses of water a day.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center gap-6 pt-2">
                    <Button size="icon" variant="outline" className="h-14 w-14 rounded-full" onClick={() => setWaterCount(p => Math.max(0, p-1))} disabled={waterCount === 0}>
                        <Minus className="h-8 w-8"/>
                    </Button>
                    <span className="text-5xl font-bold w-24 text-center">{waterCount}</span>
                     <Button size="icon" variant="outline" className="h-14 w-14 rounded-full" onClick={() => setWaterCount(p => p+1)}>
                        <Plus className="h-8 w-8"/>
                    </Button>
                </CardContent>
            </Card>
        </div>


      <Card>
        <CardHeader>
            <CardTitle>5-Star Diabetes-Safe Meal Catalog</CardTitle>
            <CardDescription>Delicious, healthy recipes curated just for you.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="Breakfast" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
              <TabsTrigger value="Breakfast" className="text-base md:text-lg py-3">Breakfast</TabsTrigger>
              <TabsTrigger value="Lunch" className="text-base md:text-lg py-3">Lunch</TabsTrigger>
              <TabsTrigger value="Dinner" className="text-base md:text-lg py-3">Dinner</TabsTrigger>
              <TabsTrigger value="Snacks" className="text-base md:text-lg py-3">Snacks</TabsTrigger>
            </TabsList>
            <TabsContent value="Breakfast" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {placeholderRecipes.filter(r => r.category === 'Breakfast').map(renderRecipeCard)}
              </div>
            </TabsContent>
            <TabsContent value="Lunch" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {placeholderRecipes.filter(r => r.category === 'Lunch').map(renderRecipeCard)}
              </div>
            </TabsContent>
            <TabsContent value="Dinner" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {placeholderRecipes.filter(r => r.category === 'Dinner').map(renderRecipeCard)}
              </div>
            </TabsContent>
            <TabsContent value="Snacks" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {placeholderRecipes.filter(r => r.category === 'Snacks').map(renderRecipeCard)}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
