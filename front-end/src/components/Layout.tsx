import { useState } from 'react';
import { Total } from './Total';
import { ItemDatabase } from './ItemDatabase';
import { MealBreakdown } from './MealBreakdown';
import { Workouts } from './Workouts';
import './Layout.css';
import { computeTotalNutrition, Meal } from '../../../lib/src/nutrition';
import { goalNutrition, meals, caloriesBurned, foodItems } from '../test-data';

export const detailOptions = ["Meals", "Workouts"];

export const Layout = () => {
	let [selectedDetail, setSelectedDetail] = useState<string>(detailOptions[0]);

	let total = computeTotalNutrition(meals);
	return (<div className="Layout">
		<div className="total-container">
			<Total nutrition={total} goal={goalNutrition} caloriesBurned={caloriesBurned} />
			<ItemDatabase items={foodItems} />
		</div>
		<div className="extra-info">
			<DetailPicker />
			{ (selectedDetail == detailOptions[0]) ? 
				<MealBreakdown /> 
				:
				<Workouts /> 
			}
		</div>
	</div>)
}

function selectDetail(selectedDetail: string, meals: Meal[]) {
}

const DetailPicker = () => {
	return (<nav className="DetailPicker">
		{detailOptions.map(option => {
			return (<div className="DetailOption" key={option}>
				{option}
			</div>);
		})}
	</nav>);
}
