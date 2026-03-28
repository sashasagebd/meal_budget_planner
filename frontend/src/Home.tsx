import SearchBar from './SearchBar';
import { useState, useEffect } from 'react';
import type { Recipe, Filters } from'./types/Types';
import Modal from './Modal';
import CartIcon from './assets/online-shopping.png';

export default function Home() {
    const [ recipes, setRecipes ] = useState<Recipe[]>([]);
    const [ searchedRecipes, setSearchedRecipes ] = useState<Recipe[]>([]);
    const [ selectedRecipe, setSelectedRecipe ] = useState<Recipe | null>(null);
    const [ search, setSearch ] = useState<string>('');
    const [ cart, setCart ] = useState<Recipe[]>([]);
    const [ openCartModal, setOpenCartModal ] = useState<boolean>(false);
    const [ cost, setCost ] = useState<number>(0);

    useEffect(() => {
        console.log(recipes);
    }, [recipes]);

    useEffect(() => {
        sendFilters({search: '', budget: null, timeConstraint: null, dietary: Array(0), constraints: Array(0), mood: Array(0), cuisine: Array(0)});
    }, []);

    useEffect(() => {
        if (!search.trim()) {
            setSearchedRecipes(recipes);
            return;
        }

        const filtered = recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(search.toLowerCase())
        );

        setSearchedRecipes(filtered);
    }, [search, recipes]);

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

    function getSearch(search: string) {
        setSearch(search);
    }

    function addToCart(recipe: Recipe) {
        setCart(prevCart => [...prevCart, recipe]);
        setCost(cost + Number(recipe.estimatedTotalCost));
    }

    return(
        <div className="min-h-screen bg-[#778873]">
            <div className="h-1/8 bg-[#A1BC98] flex items-center">
                <div className="p-1 m-2" >
                    <SearchBar sendFilters={sendFilters} sendSearch={getSearch}/>
                </div>
                <img className="absolute top-0 right-0 m-1 h-10 w-10 cursor-pointer" src={CartIcon} onClick={() => {setOpenCartModal(true)}}/>
            </div>
            <div className="flex flex-col items-center gap-2 mt-2 mb-3">
                {
                searchedRecipes.map(recipe => (
                    <div
                        key={recipe.id}
                        className="bg-[#D2DCB6] w-1/2 p-2 border-4 border-[#F1F3E0] flex items-center gap-4"
                    >
                        <button 
                            onClick={() => addToCart(recipe)}
                            className="bg-[#A1BC98] px-2 py-1 rounded"
                        >
                            Add to Cart
                        </button>
                        <div onClick={() => {openRecipeModal(recipe)}} className="bg-[#D2DCB6] w-1/2 text-center p-2 border-4 border-[#F1F3E0] flex-auto">
                            <p><strong>{recipe.name}</strong></p>
                            <p>Cost (per serving): {recipe.estimatedCostPerServing}</p>
                            <p>Servings: {recipe.servings}</p>
                            <p>Cook time: {recipe.totalCookTimeMinutes}</p>
                            <p>{recipe.description}</p>
                            <p>Score For You: {Number(recipe.score) != 0 ? recipe.score : "N/A"}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedRecipe && (
                <Modal isOpen={true} onClose={() => setSelectedRecipe(null)}>
                    <div className="flex flex-col items-center gap-2">
                        <h5 className="font-semibold capitalize">{selectedRecipe.name}</h5>
                        <p><strong>Total Cost: </strong>${selectedRecipe.estimatedTotalCost}</p>
                        <p><strong>Serving Cost: </strong>${selectedRecipe.estimatedCostPerServing}</p>
                        <p></p>
                        <div className="text-left"> 
                            <h3 className="font-semibold capitalize">Ingredients:</h3>
                            {Object.entries(selectedRecipe.ingredients).map(([category, items]) => (
                                <div key={category} className="mb-3">
                                    <p className="font-semibold capitalize text-left">
                                    {category}
                                    </p>

                                    <ul className="list-disc ml-5 text-left">
                                    {items?.map(item => (
                                        <li key={item}>{item}</li>
                                    ))}
                                    </ul>
                                </div>
                            ))}
                            <p className="font-semibold capitalize">Equipment:</p>
                            <ul className="list-disc ml-5 text-left">
                                {selectedRecipe.equipment.map(equip => (
                                <li key={equip}>{equip}</li>
                                ))}
                            </ul>
                        </div>
                        <p>{selectedRecipe.description}</p>
                    </div>
                </Modal>
            )}
            <Modal isOpen={openCartModal} onClose={() => setOpenCartModal(false)}>
                {cart.map(item => (
                    <div>
                        <h3>{item.name} - {item.servings} servings</h3>
                        <p>${item.estimatedTotalCost}</p>
                    </div>
                ))}
                <h3><strong>Total cost:</strong> ${cost}</h3>

                <div className="mt-4">
                    <h3 className="font-semibold">Ingredients Needed:</h3>
                    <ul className="list-disc ml-5">
                    {Array.from(new Set(
                        cart.flatMap(recipe =>
                        Object.values(recipe.ingredients).flat() // flatten each category array
                        )
                    )).map(ingredient => (
                        <li key={ingredient}>{ingredient}</li>
                    ))}
                    </ul>
                </div>

                <button className="bg-[#A1BC98] px-2 py-1 rounded" onClick={() => {setCart([]); setCost(0)}}>Clear Cart</button>
            </Modal>
                
        </div>
    )
}