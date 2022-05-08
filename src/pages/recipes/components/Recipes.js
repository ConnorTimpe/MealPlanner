import React, { useState, useEffect } from 'react'

//firebase
import database from '../../../firebase/Firestore'
import { ref, onValue } from 'firebase/database'

//Styles
import styles from '../styles/recipes.module.scss'
import AddRecipe from './AddRecipe'
import Recipe from './Recipe'

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);

    const db = database;

    useEffect(() => {
        const recipesRef = ref(db, 'Recipes')

        onValue(recipesRef, (snapshot) => {
            const data = snapshot.val()
            let dbRecipes = []
            Object.entries(data).forEach((entry) => {
                dbRecipes.push(entry)
            })
            setRecipes(dbRecipes)
        })

    }, [db]);


    const displayRecipeContent = () => {
      return recipes.map((recipe, index) => (
          <Recipe
              key={index}
              recipe={recipe}
          />
      ))
  }

    return (
      <div className={styles.mainContainer}>
          <div className={`${styles.mainHeader}`}>
              <h1>Recipes</h1>
          </div>
          <div>
              <div className={styles.buttonBar}>
                  <AddRecipe />
              </div>
              <div className={styles.content}>{displayRecipeContent()}</div>
          </div>
      </div>
  )
}

//Components:
//Add new recipe
//Recipe
//Ingredient
//Edit recipe / ingredient

/*
data:

recipe {
  uuid
  name: string
  description: string
  ingredients []
}

*/
