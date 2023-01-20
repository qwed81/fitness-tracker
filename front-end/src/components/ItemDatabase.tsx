import { useState, useContext } from 'react';
import { FoodItem, Meal } from '../../../lib/src/nutrition';
import { MealContext } from './MealContext';
import './ItemDatabase.css';

function getUniqueSnackName(snackNames: string[]): string {
	let num = 1;
	let name = "Snack 1";
	while (snackNames.includes(name)) {
		num += 1;
		name = `Snack ${num}`;
	}

	return name;
}

function chooseName(meals: Meal[]): string {
	meals = [...meals];
	// sorts so the biggest meal is first
	meals.sort((m1, m2) => m2.time.valueOf() - m1.time.valueOf());
	let lastMealName: string | undefined = meals[0].name;

	if (lastMealName == undefined) {
		return "Breakfast";
	}
	else if (lastMealName == "Breakfast") {
		return "Lunch";
	}
	else if (lastMealName == "Lunch") {
		return "Dinner";
	}

	let snackNames = meals.map(m => m.name).filter(name => name.includes("Snack"));
	return getUniqueSnackName(snackNames);
}

export interface ItemDatabaseProps {
	items: FoodItem[],
}

export const ItemDatabase = (props: ItemDatabaseProps) => {
	let mealContext = useContext(MealContext);
	let isEditing = mealContext.editingMeal != null ;
	let changeMeal = isEditing ? mealContext.editingMeal : mealContext.addingMeal;

	let [added, setAdded] = useState<{ [key: string]: boolean }>({});

	let setAddedClosure = (name: string, add: boolean) => {
		setAdded(state => {
			return { ...state, [name]: add };
		});
	};

	let isAdded = (name: string) => {
		if (added[name]) {
			return true;
		}
		else {
			return false;
		}
	}

	return (<form className="ItemDatabase">
		{isEditing && <h2 className="title">Edit Meal</h2>
			|| <h2 className="title">Add Meal</h2>}

		<div className="header-info">
			<label htmlFor="name">Name: </label>
			<input name="name" type="text" placeholder="Name"
				value={changeMeal && changeMeal.name || chooseName(mealContext.mealList)} />

			<label htmlFor="time">Time: </label>
			<input name="time" type="time" 
				value={undefined}/>

			<label htmlFor="search">Search: </label>
			<input name="search" type="text" placeholder="Search" />
		</div>


		<div className="item-segment">
			<div className="divider" />
			<h3>Recent: </h3>
			<ul className="item-list">
				{props.items.map(item => {
					return <FoodItemComponent item={item} key={item.name}
						added={isAdded(item.name)} setAdded={setAddedClosure} />
				})}
			</ul>

			<h3>Popular: </h3>
			<ul className="item-list">
				{props.items.map(item => {
					return <FoodItemComponent item={item} key={item.name}
						added={isAdded(item.name)} setAdded={setAddedClosure} />
				})}
			</ul>

			<h3>Added: </h3>
			<ul className="item-list">
				{props.items.map(item => {
					return <FoodItemComponent item={item} key={item.name}
						added={isAdded(item.name)} setAdded={setAddedClosure} />
				})}
			</ul>

		</div>

		<div className="control-buttons">
			<button type="reset">Reset</button>
			<button type="submit">Done</button>
		</div>
	</form>);
}

interface FoodItemComponentProps {
	item: FoodItem,
	added: boolean,
	setAdded: (name: string, added: boolean) => void
}

const FoodItemComponent = (props: FoodItemComponentProps) => {
	return (<li>
		<input type="checkbox" checked={props.added} onChange={_ => {
			props.setAdded(props.item.name, !props.added);
		}} />
		<span className="item-name">{props.item.name}</span>
		<input className="item-amt" type="number" defaultValue="1" min="1"
			max="100" disabled={!props.added} />

	</li>)
}


