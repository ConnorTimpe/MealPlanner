import React, { useState, useEffect } from 'react'

//components
import ShoppingCart from './ShoppingCart'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import AddRecipe from './AddRecipe'

//firebase
import { ref, onValue } from 'firebase/database'
import database from '../../../firebase/Firestore'

//styles
import styles from '../styles/recipePicker.module.scss'
import Fridge from './Fridge'
import Header from '../../shared/components/Header'

export default function Planner() {
    const db = database

    const [recipes, setRecipes] = useState([])
    const [selectedRecipeIds, setSelectedRecipeIds] = useState([])

    useEffect(() => {
        const recipesRef = ref(db, 'Recipes')
        onValue(recipesRef, (snapshot) => {
            const data = snapshot.val()
            let dbRecipes = [];
             Object.entries(data).forEach(entry => {
                 dbRecipes.push(entry[1])
             })
            setRecipes(dbRecipes)
        })
    }, [db])

    const isChecked = (id) => {
        return selectedRecipeIds.includes(id)
    }

    const handleChange = (event) => {
        console.log("handle on change")
        const checked = event.target.checked
        const id = parseInt(event.target.value)
        console.log(id);
        if (checked) {
            setSelectedRecipeIds([...selectedRecipeIds, id])
        } else {
            let filteredIds = selectedRecipeIds.filter(
                (selectedId) => selectedId !== id
            )
            setSelectedRecipeIds(filteredIds)
        }
    }

    console.log('recipe picker')
    const getRecipes = () => {
        console.log("recipes")
        console.log(recipes)
        return recipes.map((recipe) => {
            console.log(recipe)
            return (
                <div key={recipe.id}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isChecked(recipe.id)}
                                    onChange={handleChange}
                                    value={recipe.id}
                                />
                            }
                            label={recipe.name}
                        />
                    </FormGroup>
                </div>
            )
        })
    }

    // :
    // {recipe.ingredients.map((ingredient) => {
    //     return <div>{ingredient}</div>
    // })}

    return (
        <div className={styles.recipePicker}>
            Recipe picker
            <Header />
            <div> {getRecipes()} </div>
            <AddRecipe />
            <ShoppingCart selectedRecipeIds={selectedRecipeIds} recipes={recipes} />
            <Fridge />
        </div>
    )
}
