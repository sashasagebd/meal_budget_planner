package main

import (
	// "sort"
	// "strings"
)


func recommendMeals(meals []Meal, filters Filters) []RecResult {
	results := make([]RecResult, 0)

	for _, meal := range meals {
		if !passesEdgeCases(meal, filters) {
			continue
		}

		results = append(results, RecResult{
			ID:												meal.ID,
			Search:										meal.Search,
			EstimatedCostPerServing:	meal.EstimatedCostPerServing,
			TotalCookTimeMinutes:			meal.TotalCookTimeMinutes,
			Dietary:									meal.Tags.Dietary,
			Constraints:							meal.Tags.Constraints,
			Mood:											meal.Tags.Mood,
			Cuisine:									meal.Tags.Cuisine,
			Description:							meal.Description,
		})

		if len(results) > 5 {
			results = results[:5]
		}

	}

	return results
}


// statement helpers
func passesEdgeCases(meal Meal, filters Filters) bool {
	// return false for edge case failures
	// TODO: edge cases

	// else return true
	return true
}



