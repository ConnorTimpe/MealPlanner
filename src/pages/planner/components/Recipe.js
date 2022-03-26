import React from 'react'

export default function Recipe({ recipe }) {
    console.log('recipe 2')
    console.log(recipe)
    return (
        <div key={recipe.id}>
            <h2>{recipe.name}</h2>
            {recipe.ingredients.split(' ,').map((ingredient, index) => {
                return <div key={index}>{ingredient}</div>
            })}
        </div>
    )
}
