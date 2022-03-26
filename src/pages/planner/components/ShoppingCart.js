import React from 'react'

import Recipe from './Recipe'

import database from '../../../firebase/Firestore';
import AddToCart from './AddToCart';

export default function ShoppingCart({ selectedRecipeIds, recipes }) {
    const displayIngredients = () => {
        return selectedRecipeIds.map((recipeId) => {
            const recipe = recipes.find(
                (recipeSource) => recipeSource.id === recipeId
            )
            console.log('recipe')
            console.log(recipe)
            return <Recipe recipe={recipe} key={recipe.id}/>
        })
    }

    return (
        <div>
            <h1>Shopping Cart:</h1>
            <div>{displayIngredients()}</div>
            <AddToCart />
        </div>
    )
}
