import { useContext } from 'react';
import { MealContext } from './MealContext';
import { Meal, computeMealNutrition, Nutrition, getNutritionItem, formatNutritionItem, NutritionItemType } from '../../../lib/src/nutrition';
import './MealBreakdown.css';

function createOrderedMealList(mealList: Meal[], addingMeal: Meal | null, editingMeal: Meal | null): Meal[] {
	let retList = [...mealList];
	if (addingMeal != null) {
		retList.push(addingMeal);
	}
	if (editingMeal != null) {
		retList.push(editingMeal);
	}

	retList.sort((m1, m2) => {
		return m2.time.valueOf() - m1.time.valueOf();
	});
	return retList;
}

export const MealBreakdown = () => {
	let mealContext = useContext(MealContext);

	let editMeal = (meal: Meal) => {
		let oldMealEdit: Meal | null = null;
		mealContext.setEditingMeal(old => {
			oldMealEdit = old;
			return meal;
		});

		mealContext.setMealList(mealList => {
			let list = mealList.filter(listMeal => {
				return listMeal.name != meal.name; 
			});
			if (oldMealEdit != null) {
				list.push(oldMealEdit);
			}
			return list;
		});
	};

	let deleteMeal = (meal: Meal) => {
		mealContext.setMealList(oldList => {
			return oldList.filter(oldMeal => oldMeal.name != meal.name);
		});
	}

	let orderedMeals = createOrderedMealList(mealContext.mealList, mealContext.addingMeal, mealContext.editingMeal);
	return (<ul className="MealBreakdown">
		{orderedMeals.map(meal => {
			let isBeingEdited = mealContext.editingMeal != null && mealContext.editingMeal.name == meal.name;
			return <MealComponent key={meal.name} meal={meal} editMeal={editMeal}
				deleteMeal={deleteMeal} isBeingEdited={isBeingEdited} />;
		})}
	</ul>)
};


function formatItemIfExists(nutrition: Nutrition, name: NutritionItemType): string {
	let item = getNutritionItem(nutrition, name);
	if (item) {
		return formatNutritionItem(item) + "  ";
	}
	else {
		return "";
	}
}

function userLocale(): string {
	if (navigator.languages != undefined)
		return navigator.languages[0];
	return navigator.language;
}

interface MealComponentProps {
	meal: Meal,
	isBeingEdited: boolean,
	editMeal: (meal: Meal) => void,
	deleteMeal: (meal: Meal) => void
}


const MealComponent = (props: MealComponentProps) => {
	let nutrition = computeMealNutrition(props.meal);
	return (<li className={`meal-container ${props.isBeingEdited && 'editing'}`}>
		<span className="meal-name">{props.meal.name}: </span>
		<span className="meal-macros">
			&nbsp;{formatItemIfExists(nutrition, "Calories")} |
			&nbsp;{formatItemIfExists(nutrition, "Protien")} Protein |
			&nbsp;{props.meal.time.toLocaleTimeString(userLocale())}
		</span>

		<button className="edit-link" onClick={() => {
			props.editMeal(props.meal);
		}}>edit</button>

		<button className="delete-link" onClick={() => {
			props.deleteMeal(props.meal);
		}}>delete</button>

		<ul>
			{props.meal.items.map(food => {
				return <li key={food.item.name}>{food.item.name} x{food.count}</li>
			})}
		</ul>
	</li>)
}
