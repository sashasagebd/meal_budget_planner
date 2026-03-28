
package main

type Filters struct {
	Search					string		`json:"search"`
	Budget					float64		`json:"budget"`
	TimeConstraint	int				`json:"timeConstraint"`
	Dietary					[]string	`json:"dietary"`
	Constraints			[]string	`json:"constraints"`
	Mood						[]string	`json:"mood"`
	Cuisine					[]string	`json:"cuisine"`
}

type Meal struct {
	ID												string					`json:"id"`
	Name											string					`json:"name"`
	Score											int							`json:"score"`
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

type ScoredMeal struct {
	Meal 	Meal
	Score int
}

type RecResponse struct {
	Results		[]Meal		`json:"results"`
}
