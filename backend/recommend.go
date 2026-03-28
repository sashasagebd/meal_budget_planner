package main

import (
	// "sort"
	// "strings"
)


func recommendMeals(meals []Meal, filters Filters) []Meal {
	results := make([]Meal, 0)

	for _, meal := range meals {
		if !passesEdgeCases(meal, filters) {
			continue
		}

		results = append(results, meal)

		// results = append(results, RecResult{
		// 	ID:												meal.ID,
		// 	Name:											meal.Name,
		// 	EstimatedCostPerServing:	meal.EstimatedCostPerServing,
		// 	TotalCookTimeMinutes:			meal.TotalCookTimeMinutes,
		// 	Ingredients:							meal.Ingredients,
		// 	Tags:											meal.Tags,
		// 	// Dietary:									meal.Tags.Dietary,
		// 	// Constraints:							meal.Tags.Constraints,
		// 	// Mood:											meal.Tags.Mood,
		// 	// Cuisine:									meal.Tags.Cuisine,
		// 	Description:							meal.Description,
		// })

		if len(results) > 5 {
			results = results[:5]
		}

	}

	return results
}


// statement helpers
func passesEdgeCases(meal Meal, filters Filters) bool {
	// return false for edge case failures
	// budget edge case
	if filters.Budget > 0 && meal.EstimatedCostPerServing > filters.Budget {
		return false
	}

	// time edge case
	if filters.TimeConstraint > 0 && meal.TotalCookTimeMinutes > filters.TimeConstraint {
		return false
	}

	// dietary edge case
	for _, tag := range filters.Dietary {
		found := false
		for _, mealTag := range meal.Tags.Dietary {
			if mealTag == tag {
				found = true
				break
			}
		}
		if !found {
			return false
		}
	}

	// constraints edge case

	// mood edge case

	// cuisine edge case


	// else return true
	return true
}



