import { Nutrition, NutritionItem, Range, rangePercentage, addRange, getNutritionItem, subRange, formatNutritionItem, formatRange } from '../../../lib/src/nutrition';
import './Total.css';

export interface TotalProps {
	nutrition: Nutrition,
	goal: Nutrition,
	caloriesBurned: Range
}

export const Total = (props: TotalProps) => {
	let goalCalories = getNutritionItem(props.goal, "Calories");
	let calories = getNutritionItem(props.nutrition, "Calories");
	let fmtRemainingCalories: string;

	if (goalCalories == undefined) {
 		fmtRemainingCalories = "goal not set";
	}
	else if (calories == undefined) {
 		fmtRemainingCalories = formatNutritionItem(goalCalories);
	}
	else {
		let range = subRange(goalCalories!.range, calories!.range);
		range = addRange(range, props.caloriesBurned);
		fmtRemainingCalories = formatRange(range, "");
	}

	let fmtGoalCalories: string | undefined = goalCalories ? formatNutritionItem(goalCalories) : undefined;
	let fmtCalories: string = calories ? formatNutritionItem(calories) : "0";
	let fmtCaloriesBurned = formatRange(props.caloriesBurned, "kCal");

	return (<div className="Total">
		<div className="calorie">
			<h1 className="calories-remaining">{ fmtRemainingCalories }<span className="remaining"> Calories Remaining</span></h1>
			{ fmtGoalCalories && 
				<div className="calorie-calc">
					<div>
						<div className="variable">{ fmtGoalCalories }</div>
						<span className="identifier">goal</span>
					</div>
					<span>-</span>
					<div>
						<div className="variable">{ fmtCalories }</div>
						<span className="identifier">eaten</span>
					</div>
					<span>+</span>
					<div>
						<div className="variable">{ fmtCaloriesBurned }</div>
						<span className="identifier">burned</span>
					</div>
				</div>
			}
		</div>
		<div className="divider"/>
		<div className="nutrition-item-container">
			{ Object.values(props.nutrition).map(item => { 
				if (item.name != "Calories") {
					return <NutritionItemTotal key={item.name} item={item} 
						goal={props.goal[item.name]}/>
				}
			}) }
		</div>
	</div>);
}

interface NutritionItemTotalProps {
	item: NutritionItem,
	goal: NutritionItem | undefined
}

const NutritionItemTotal = (props: NutritionItemTotalProps) => {
	let fmtGoal: string | undefined;
	if (props.goal) {
		let range = rangePercentage(props.item.range, props.goal.range!);
		range = {
			lowerBound: Math.floor(range.lowerBound * 100),
			upperBound: Math.floor(range.upperBound * 100)
		};
		fmtGoal = range.lowerBound + "-" + range.upperBound;
	}
	else {
		fmtGoal = "-.-";
	}

	return (<div className="nutrition-item">
		<div className="nutrition-item-name">{ props.item.name }</div>
		<div>{ formatNutritionItem(props.item) }</div>
		<span>({ fmtGoal }%)</span>
	</div>)
}



