
package main

type Filters struct {
	Search					string
	Budget					float64
	TimeConstraint	int
	Dietary					[]string
	Constraints			[]string
	Mood						[]string
	Cuisine					[]string
}

type Meal struct {
	ID												string					`json:"id"`
	Name											string					`json:"name"`
	EstimatedTotalCost				float64					`json:"estimatedTotalCost"`
	EstimatedCostPerServing		float64					`json:"estimatedCostPerServing"`
	Servings									int							`json:"servings"`
	ActiveCookTimeMinutes			int							`json:"activeCookTimeMinutes"`
	TotalCookTimeMinutes			int							`json:"totalCookTimeMinutes"`
	Difficulty								string					`json:"difficulty"`
	Ingredients								MealIngredients	`json:"ingredients"`
	Tags											MealTags				`json:"tags"`
	Equipment									[]string				`json:"equipment"`
	Description								string					`json:"description"`
}

type MealIngredients struct {
	Produce			[]string	`json:"produce"`
	Proteins		[]string	`json:"proteins"`
	Carbs				[]string	`json:"carbs"`
	Condiments	[]string	`json:"condiments"`
	Spices			[]string	`json:"spices"`
	Other				[]string	`json:"other"`
}

type MealTags struct {
	Dietary			[]string	`json:"dietary"`
	Constraints	[]string	`json:"constraints"`
	Mood				[]string	`json:"mood"`
	Cuisine			[]string	`json:"cuisine"`
}


// type RecResult struct {
// 	ID												string		`json:"id"`
// 	Name											string		`json:"search"`
// 	EstimatedCostPerServing		float64		`json:"estimatedCostPerServing"`
// 	TotalCookTimeMinutes			int				`json:"totalCookTimeMinutes"`
// 	Ingredients								MealIngredients	`json:"ingredients"`
// 	Tags											MealTags	`json:"tags"`
// 	// Dietary										[]string	`json:"dietary"`
// 	// Constraints								[]string	`json:"constraints"`
// 	// Mood											[]string	`json:"mood"`
// 	// Cuisine										[]string	`json:"cuisine"`
// 	Description								string		`json:"description"`
// }

type RecResponse struct {
	Results		[]Meal		`json:"results"`
}
