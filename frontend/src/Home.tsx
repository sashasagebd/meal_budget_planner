import SearchBar from './SearchBar';
import { useState, useEffect } from 'react';
import type { Recipe, Filters } from'./types/Types';
import Modal from './Modal';

export default function Home() {
    const [ recipes, setRecipes ] = useState<Recipe[]>([]);
    const [ selectedRecipe, setSelectedRecipe ] = useState<Recipe | null>(null);

    useEffect(() => {
        console.log(recipes);
    }, [recipes]);

    useEffect(() => {
        sendFilters({search: '', budget: null, timeConstraint: null, dietary: Array(0), constraints: Array(0), mood: Array(0), cuisine: Array(0)});
    }, []);

    async function sendFilters(filters: Filters) {
        try {
            console.log(filters);
            const response = await fetch("/recommendations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(filters),
            });

            if(!response.ok) {
                throw new Error(`Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            setRecipes(data.results);
        } catch(err) {
            console.error(err);
        }
    }

    function openRecipeModal(recipe: Recipe) {
        setSelectedRecipe(recipe);
    }

    return(
        <div className="h-full bg-[#778873]">
            <div className="h-1/12 bg-[#A1BC98] flex items-center">
                <div className="p-1 m-2" >
                    <SearchBar sendFilters={sendFilters}/>
                </div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <h3 className="mt-2">Recipes</h3>
                {
                recipes.map(recipe => (
                    <div onClick={() => {openRecipeModal(recipe)}} className="bg-[#D2DCB6] w-1/2 text-center p-2 border-4 border-[#F1F3E0]">
                        <p>{recipe.id}</p>
                        <p>Cost (per serving): {recipe.estimatedCostPerServing}</p>
                        <p>Cook time: {recipe.totalCookTimeMinutes}</p>
                        <p>{recipe.description}</p>
                    </div>
                ))}
            </div>

            {selectedRecipe && (
                <Modal isOpen={true} onClose={() => setSelectedRecipe(null)}>
                    <div className="flex flex-col items-center">
                        <h5>{selectedRecipe.id}</h5>
                        <p>Ingredients:</p>
                        {/*recipe.ingredients.map(ingredient => (
                            <ingredient>
                        ))*/}
                        <p>Equipment:</p>
                        {/*recipe.ingredients.map(ingredient => (
                            <ingredient>
                        ))*/}
                    </div>
                </Modal>
            )}
                
        </div>
    )
}