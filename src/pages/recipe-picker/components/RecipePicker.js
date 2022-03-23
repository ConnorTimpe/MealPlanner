import React, { useState } from 'react'

//components
import { recipies } from '../../../resources/recipies'
import ShoppingCart from './ShoppingCart'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

//styles
import styles from '../styles/recipePicker.module.scss'

export default function RecipePicker() {
    const [selectedRecipeIds, setSelectedRecipeIds] = useState([])

    const isChecked = (id) => {
        return selectedRecipeIds.includes(id)
    }

    const handleChange = (event) => {
        const checked = event.target.checked
        const id = parseInt(event.target.value)
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
    const getRecipies = () => {
        return recipies.map((recipe) => {
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
            <div> {getRecipies()} </div>
            <ShoppingCart selectedRecipeIds={selectedRecipeIds}/>
        </div>
    )
}
