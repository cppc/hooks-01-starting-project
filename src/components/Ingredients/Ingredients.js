import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';

const Ingredients = () => {
  const [ ingredients, setIngredients ] = useState([]);

  const addIngredient = ingredient => {
    fetch('https://burgerhooks.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
        .then(responseData => {
          setIngredients(prevIngredients => [...prevIngredients, { id: responseData.name, ...ingredient }])
        })
  }

  const removeIngredient = id => {
    setIngredients(prevIngredients => prevIngredients.filter(i => i.id !== id))
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredient}/>

      <section>
        <Search />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredient} />
      </section>
    </div>
  );
}

export default Ingredients;
