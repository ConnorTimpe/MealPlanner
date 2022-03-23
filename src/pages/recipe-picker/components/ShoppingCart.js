import React from 'react'

import { recipies } from '../../../resources/recipies'
import Recipe from './Recipe'

import Firestore from '../../../firebase/Firestore';

export default function ShoppingCart({ selectedRecipeIds }) {
    const displayIngredients = () => {
        return selectedRecipeIds.map((recipeId) => {
            const recipe = recipies.find(
                (recipeSource) => recipeSource.id === recipeId
            )
            console.log('recipe')
            console.log(recipe)
            return <Recipe recipe={recipe} />
        })
    }

    return (
        <div>
            <h1>Shopping Cart:</h1>
            <div>{displayIngredients()}</div>
            <Firestore />
        </div>
    )
}
