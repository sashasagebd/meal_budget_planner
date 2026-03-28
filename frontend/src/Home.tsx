import SearchBar from './SearchBar';
import { useState } from 'react';
import type { Recipe, Filters } from'./types/Types';

export default function Home() {
    const [ recipes, setRecipes ] = useState<Recipe[]>([]);

    async function getRecipes() {
        try {
            /*const response = await fetch('http://localhost:5000/recommendations');
            if(!response.ok) {
                throw new Error(`Status: ${response.status}`);
            }
            const result = await response.json();
            setRecipes(result);
            */
        } catch(err) {
            console.error(err);
        } 
    }

    async function sendFilters(filters: Filters) {
        try {
            const response = await fetch("http://localhost:5000/recommendations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(filters),
            });
        } catch(err) {
            console.error(err);
        }
    }

    return(
        <div className="h-full bg-[#778873]">
            <div className="h-1/12 bg-[#A1BC98] flex items-center">
                <div className="p-1 m-2" >
                    <SearchBar sendFilters={sendFilters}/>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <h3 className="mt-2">Recipes</h3>
                {
                recipes.map(resipe => (
                    <div className="bg-[#D2DCB6]">
                    </div>
                ))}
                <div className="bg-[#D2DCB6] w-1/2 text-center">
                    <p>Name</p>
                    <p>Cost (per serving):</p>
                    <p>Cost (total):</p>
                    <p>Difficulty</p>
                    <p>Ingredients:</p>
                    {/*recipe.ingredients.map(ingredient => (
                        <ingredient>
                    ))*/}
                    <p>Equipment:</p>
                    {/*recipe.ingredients.map(ingredient => (
                        <ingredient>
                    ))*/}
                    <p>Description</p>

                </div>
            </div>
                
        </div>
    )
}