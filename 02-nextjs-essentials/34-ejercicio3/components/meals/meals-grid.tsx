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
          {/*Cuando usas el spread operator (...), lo que haces es descomponer un objeto y pasar cada una de sus 
          propiedades como props individuales. Esto tiene sentido cuando estás tratando con un objeto que contiene 
          múltiples propiedades que deseas pasar al componente de manera individual.*/}
          <MealItem {...meal} />
        </li>
      ))}

    </ul>
    
  );
}
