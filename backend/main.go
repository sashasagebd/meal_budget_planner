
package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
)

func main() {
	http.HandleFunc("/recommendations", recHandler)

	log.Println("server listening on :5000")
	if err := http.ListenAndServe(":5000", nil); err != nil {
		log.Fatal(err)
	}
}


func recHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var filters Filters
	if err := json.NewDecoder(r.Body).Decode(&filters); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	meals, err := loadMeals("data/meals.json")
	if err != nil {
		http.Error(w, "failed to load meals", http.StatusInternalServerError)
		log.Println("loadMeals error:", err)
		return
	}

	results := recommendMeals(meals, filters)

	resp := RecResponse{
		Results: results,
	}

	if err := json.NewEncoder(w).Encode(resp); err != nil {
		http.Error(w, "failed to encode response", http.StatusInternalServerError)
	}

}


func loadMeals(path string) ([]Meal, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	var meals []Meal
	if err := json.Unmarshal(data, &meals); err != nil {
		return nil, err
	}

	return meals, nil
}

