package main

import (
	"sort"
)


func recommendMeals(meals []Meal, filters Filters) []Meal {
	results := make([]Meal, 0)

	for _, meal := range meals {
		if !passesEdgeCases(meal, filters) {
			continue
		}

		meal.Score = scoreMeal(meal, filters)
		results = append(results, meal)
	}

	sort.Slice(results, func(i, j int) bool {
		if results[i].Score == results[j].Score {
			return results[i].EstimatedCostPerServing < results[j].EstimatedCostPerServing
		}
		return results[i].Score > results[j].Score
	})

	if len(results) > 5 {
		results = results[:5]
	}

	return results
}


// alg helpers
func scoreMeal(meal Meal, filters Filters) int {
	score := 0

	// tag scoring -- constraints > mood > cuisine
	score += 3 * countMatches(meal.Tags.Constraints, filters.Constraints)
	score += 2 * countMatches(meal.Tags.Mood, filters.Mood)
	score += 1 * countMatches(meal.Tags.Cuisine, filters.Cuisine)

	// budget soft scoring
	if filters.Budget > 0 {
		if meal.EstimatedCostPerServing <= filters.Budget*0.6 {
			score += 2
		} else if meal.EstimatedCostPerServing <= filters.Budget*0.85 {
			score += 1
		}
	}

	// time constraint soft scoring
	if filters.TimeConstraint > 0 {
		if meal.TotalCookTimeMinutes <= int(float64(filters.TimeConstraint)*0.6) {
			score += 2
		} else if meal.TotalCookTimeMinutes <= int(float64(filters.TimeConstraint)*0.85) {
			score += 1
		}
	}

	return score
}

func countMatches(mealTags []string, requested []string) int {
	count := 0
	for _, req := range requested {
		for _, tag := range mealTags {
			if tag == req {
				count++
				break
			}
		}
	}
	return count
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}


// bool statement helper
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



