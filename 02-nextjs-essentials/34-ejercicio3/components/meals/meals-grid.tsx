import MealItem from "./meal-item";
import classes from "./meals-grid.module.css";
import { MealItemProps } from "./meal-item";

interface MealsGridProps {
  meals: Array<MealItemProps & { id: string }>;
}

export default function MealsGrid({ meals }: MealsGridProps) {
  return (

    <ul className={classes.meals}>

      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}

    </ul>
    
  );
}
