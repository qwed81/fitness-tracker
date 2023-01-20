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
