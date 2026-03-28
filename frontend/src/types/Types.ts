export interface Recipe {
    id: string;
    name: string;
    estimatedTotalCost: string;
    estimatedCostPerServing: number;
    servings: number;
    totalCookTimeMinutes: number;
    difficulty: string;
    ingredients: Ingredients;
    tags: Tag[];
    equipment: string[];
    description: string;
}

export interface Ingredients {
  carbs?: string[];
  condiments?: string[];
  other?: string[];
  produce?: string[];
  proteins?: string[];
  spices?: string[];
}

export interface Filters {
    search: string;
    budget: number | null;
    timeConstraint: number | null;
    dietary: string[] | null;
    constraints: string[] | null;
    mood: string[] | null;
    cuisine: string[] | null;
}

export type TagType = "dietary" | "constraint" | "mood" | "cuisine";

export interface Tag {
  type: TagType;
  value: string;
}
