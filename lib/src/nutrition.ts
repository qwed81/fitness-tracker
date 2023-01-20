export interface Range {
	lowerBound: number,
	upperBound: number
}

export type NutritionItemType = "Calories" | "Protien" | "Carbs" | "Fat" | "Vit A" | "Vit B";
export type Unit = "g" | "kCal" | "mg";
export interface NutritionItem {
	name: NutritionItemType,
	range: Range,
	unit: Unit,
};

export function formatNutritionItem(item: NutritionItem): string {
	return formatRange(item.range, item.unit);
}

export function formatRange(range: Range, unit: string) {
	let str;
	if (range.lowerBound == range.upperBound) {
		str = range.lowerBound + unit;
	}
	else {
		str = range.lowerBound + "-"
			+ range.upperBound + unit;
	}
	return str;
}

export interface FoodItem {
	name: string,
	nutrition: Nutrition
}

export interface FoodItemCount {
	item: FoodItem,
	count: number
}

export interface Meal {
	name: string,
	time: Date,
	items: FoodItemCount[]
}

export type Nutrition = { [key: string]: NutritionItem };

export function addRange(r1: Range, r2: Range): Range {
	return {
		lowerBound: r1.lowerBound + r2.lowerBound,
		upperBound: r1.upperBound + r2.upperBound,
	}
}

export function subRange(r1: Range, r2: Range): Range {
	return {
		lowerBound: r1.lowerBound - r2.upperBound,
		upperBound: r1.upperBound - r2.lowerBound,
	}
}

export function rangePercentage(r1: Range, r2: Range): Range {
	return {
		lowerBound: r1.lowerBound / r2.upperBound,
		upperBound: r1.upperBound / r2.lowerBound,
	}
}

export function getNutritionItem(nutrition: Nutrition, item: NutritionItemType): NutritionItem | undefined {
	return structuredClone(nutrition[item]);
}

export function setNutritionItem(nutrition: Nutrition, item: NutritionItem) {
	nutrition[item.name] = structuredClone(item);
}

function addNutrition(target: Nutrition, value: Nutrition) {
	for (let nutritionItem of Object.values(value)) {
		if (target[nutritionItem.name] == undefined) {
			target[nutritionItem.name] = structuredClone(nutritionItem);
		}
		else {
			let totalRange = target[nutritionItem.name].range;
			target[nutritionItem.name].range = addRange(totalRange, nutritionItem.range);
		}
	}
}

export function computeMealNutrition(meal: Meal): Nutrition {
	let total: Nutrition = {};
	for (let foodItem of meal.items) {
		for (let i = 0; i < foodItem.count; i += 1) {
			addNutrition(total, foodItem.item.nutrition);
		}
	}

	return total;
}

export function computeTotalNutrition(meals: Meal[]): Nutrition {
	let total: Nutrition = {};
	for (let meal of meals) {
		let mealNutrition = computeMealNutrition(meal);
		addNutrition(total, mealNutrition);
	}

	return total;
}


