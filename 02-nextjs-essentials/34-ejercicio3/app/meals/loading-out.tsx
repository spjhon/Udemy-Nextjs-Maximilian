import classes from './loading.module.css';

export default function MealsLoadingPage() {
  return <p className={classes.loading}>Fetching meals...</p>;
}

//este archivo se re-nombre a -out por que se va a utilizar suspense para que lo que se pueda cargar de una page
//se haga y lo que esta en una promesa a espera pues que muestre el skeleton de loading