import { Nutrition, Range, Meal, FoodItem } from '../../lib/src/nutrition';

const basicNutrition: Nutrition = {
	"Calories": {
		name: "Calories",
		range: { lowerBound: 400, upperBound: 400 },
		unit: "kCal"
	},
	"Protien": {
		name: "Protien",
		range: { lowerBound: 11, upperBound: 12 },
		unit: "g"
	},
	"Carbs": {
		name: "Carbs",
		range: { lowerBound: 11, upperBound: 12 },
		unit: "g"
	},
	"Fat": {
		name: "Fat",
		range: { lowerBound: 11, upperBound: 12 },
		unit: "g"
	},
	"Vit A": {
		name: "Vit A",
		range: { lowerBound: 11, upperBound: 12 },
		unit: "mg"
	}
}

const eggs: FoodItem = {
	name: "Eggs",
	nutrition: basicNutrition
};

const steak: FoodItem = {
	name: "Steak",
	nutrition: basicNutrition
};

export const foodItems = [eggs, steak];

const breakfast: Meal = {
	name: "Breakfast",
	time: new Date(2023, 1, 5, 8),
	items: [
		{ item: eggs, count: 12 },
	]
};

const lunch: Meal = {
	name: "Lunch",
	time: new Date(2023, 1, 5, 12),
	items: [
		{ item: steak, count: 3 },
	]
};

const dinner: Meal = {
	name: "Dinner",
	time: new Date(2023, 1, 5, 15),
	items: [
		{ item: steak, count: 3 },
	]
};

export const meals = [breakfast, lunch];

/*
export const testNutrition: Nutrition = {
	"Calories": {
		name: "Calories",
		range: { lowerBound: 400, upperBound: 500 },
		unit: "kCal"
	},
	"Protien": {
		name: "Protien",
		range: { lowerBound: 10, upperBound: 11 },
		unit: "g"
	},
	"Carbs": {
		name: "Carbs",
		range: { lowerBound: 10, upperBound: 12 },
		unit: "g"
	},
	"Fat": {
		name: "Fat",
		range: { lowerBound: 10, upperBound: 13 },
		unit: "g"
	},
	"Vit A": {
		name: "Vit A",
		range: { lowerBound: 10, upperBound: 13 },
		unit: "mg"
	},
	"Vit B": {
		name: "Vit B",
		range: { lowerBound: 10, upperBound: 13 },
		unit: "mg"
	}
};
*/

export const goalNutrition: Nutrition = {
	"Calories": {
		name: "Calories",
		range: { lowerBound: 1700, upperBound: 1700 },
		unit: "kCal"
	},
	"Protien": {
		name: "Protien",
		range: { lowerBound: 11, upperBound: 11 },
		unit: "g"
	},
	"Carbs": {
		name: "Carbs",
		range: { lowerBound: 11, upperBound: 11 },
		unit: "g"
	},
	"Fat": {
		name: "Fat",
		range: { lowerBound: 11, upperBound: 11 },
		unit: "g"
	}

};

export const caloriesBurned: Range = {
	lowerBound: 30,
	upperBound: 30
};

