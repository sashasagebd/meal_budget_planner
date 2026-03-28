import { useState } from 'react';
import Modal from './Modal';
import type { Filters, Tag } from './types/Types'

interface SearchBarProps {
        sendFilters: (filters: Filters) => void;
}

export default function SearchBar({ sendFilters }: SearchBarProps) {
    const [ search, setSearch ] = useState<string>('');
    const [ openFilters, setOpenFilters ] = useState<boolean>(false);
    const [ dietaryTags, setDietaryTags ] = useState<string[]>([]);
    const [ constraintTags, setConstraintTags ] = useState<string[]>([]);
    const [ moodTags, setMoodTags ] = useState<string[]>([]);
    const [ cuisineTags, setCuisineTags ] = useState<string[]>([]);
    const [ maxCost, setMaxCost ] = useState<number | null>(null);
    const [ maxTime, setMaxTime ] = useState<number | null>(null);

    const [allTags, setAllTags] = useState<Tag[]>([
        {type: "dietary", value: "vegetarian"},
        {type: "dietary", value: "vegan"},
        {type: "dietary", value: "dairy-free"},
        {type: "dietary", value: "gluten-free"},
        {type: "dietary", value: "nut-free"},
        {type: "dietary", value: "high-protein"},
        {type: "constraint", value: "cheap"},
        {type: "constraint", value: "very-cheap"},
        {type: "constraint", value: "pantry-friendly"},
        {type: "constraint", value: "batch-friendly"},
        {type: "constraint", value: "quick"},
        {type: "constraint", value: "low-effort"},
        {type: "constraint", value: "leftover-friendly"},
        {type: "mood", value: "comfort"},
        {type: "mood", value: "hearty"},
        {type: "mood", value: "fresh"},
        {type: "mood", value: "light"},
        {type: "mood", value: "savory"},
        {type: "mood", value: "filling"},
        {type: "cuisine", value: "american"},
        {type: "cuisine", value: "mexican"},
        {type: "cuisine", value: "italian"},
        {type: "cuisine", value: "indian"},
        {type: "cuisine", value: "mediterranean"},
        {type: "cuisine", value: "french"},
    ]);
    const [ showDropdown, setShowDropdown ] = useState<boolean>(false);

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value);
    }

    function handleMaxCost(event: React.ChangeEvent<HTMLInputElement>) {
        setMaxCost(Number(event.target.value));
    }

    function handleMaxTime(event: React.ChangeEvent<HTMLInputElement>) {
        setMaxTime(Number(event.target.value));
    }

    function handleOpenFilters() {
        setOpenFilters(true);
    }

    function handleCheckboxChange(tag: string, type: string) {
        switch(type) {
            case "dietary":
                setDietaryTags(prev => {
                    if (prev.includes(tag)) {
                    // remove if already selected
                        return prev.filter(t => t !== tag);
                    } else {
                    // add if not selected
                        return [...prev, tag];
                    }
                })
                break;
            case "constraint":
                setConstraintTags(prev => {
                    if (prev.includes(tag)) {
                        return prev.filter(t => t !== tag);
                    } else {
                        return [...prev, tag];
                    }
                })
                break;
            case "mood":
                setMoodTags(prev => {
                    if (prev.includes(tag)) {
                        return prev.filter(t => t !== tag);
                    } else {
                        return [...prev, tag];
                    }
                })
                break;
            case "cuisine":
                setCuisineTags(prev => {
                    if (prev.includes(tag)) {
                        return prev.filter(t => t !== tag);
                    } else {
                        return [...prev, tag];
                    }
                })
                break;
        }
    }

    async function handleSubmit() {
        sendFilters({search: "", budget: maxCost, timeConstraint: maxTime, dietary: dietaryTags, constraints: constraintTags, mood: moodTags, cuisine: cuisineTags});
    }

    return(
        <div>
            <div className="flex gap-2">
                <p>Search</p>
                <input
                    className="outline-solid"
                    type="text"
                    value={search}
                    onChange={handleSearch}
                />
                <svg viewBox="0,0 100,100" height="20" width="20" role="img" onClick={handleOpenFilters}>
                    <circle cx="50" cy="15" r="10" />
                    <circle cx="50" cy="50" r="10" />
                    <circle cx="50" cy="85" r="10" />
                </svg>
            </div>
            <Modal isOpen={openFilters} onClose={() => setOpenFilters(false)}>
                <form className="flex flex-col gap-1">
                    <p>Max Cost:</p>
                    <input type="number" className="outline" onChange={handleMaxCost}/>

                    <p>Max Cook Time:</p>
                    <input type="number" className="outline" onChange={handleMaxTime}/>

                    <button type="button" className="outline" onClick={() => setShowDropdown(!showDropdown)}>
                        Add Tags
                    </button>
                    {showDropdown && allTags.map(tag => (
                        <div className="flex">
                            <p>{tag.value}</p>
                            <input type="checkbox" onClick={() => handleCheckboxChange(tag.value, tag.type)}/>
                        </div>
                    ))}

                    <button type="button" className="outline" onClick={() => handleSubmit()}>
                        Submit Filters
                    </button>

                </form>
            </Modal>
        </div>
    )
}