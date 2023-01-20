import React, { PropsWithChildren, useState } from 'react';
import { Meal } from '../../../lib/src/nutrition';
import { meals } from '../test-data';

export interface IMealContext {
	editingMeal: Meal | null
	setEditingMeal: (updater: (old: Meal | null) => Meal | null) => void,
	mealList: Meal[],
	setMealList: (updater: (old: Meal[]) => Meal[]) => void,
	addingMeal: Meal,
	setAddingMeal: (updater: (old: Meal | null) => Meal | null) => void,
}

export const MealContext = React.createContext<IMealContext>({
	editingMeal: null,
	setEditingMeal: () => { },
	addingMeal: null,
	setAddingMeal: () => { },
	mealList: [],
	setMealList: () => { }
});

export const MealContextProvider = (props: PropsWithChildren) => {
	let [editingMeal, setEditingMeal] = useState<Meal | null>(null);
	let [addingMeal, setAddingMeal] = useState<Meal | null>(null);
	let [mealList, setMealList] = useState<Meal[]>(meals);

	return (<MealContext.Provider value={{
		editingMeal,
		setEditingMeal,
		addingMeal,
		setAddingMeal,
		mealList,
		setMealList
	}}>
		{props.children}
	</MealContext.Provider>);
}



