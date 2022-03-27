import React, { useState, useEffect, useCallback } from 'react'

//Components
import { Checkbox, MenuItem, Select } from '@mui/material'

//Icons
import { ReactComponent as Delete } from '../../../resources/icons/clear.svg'

//Firebase
import database from '../../../firebase/Firestore'
import { ref, set, remove } from 'firebase/database'

//Styles
import generalStyles from '../../shared/styles/generalStyles.module.scss'

export default function FridgeItem({
    fridgeItem,
    recipes,
    selectAll,
    clearAll,
}) {
    console.log('fridgeItem')
    console.log(fridgeItem)

    const [isUsed, setIsUsed] = useState(fridgeItem[1].used)
    const [forRecipe, setForRecipe] = useState(fridgeItem[1].forRecipe)

    useEffect(() => {
        setIsUsed(fridgeItem[1].used)
        setForRecipe(fridgeItem[1].forRecipe)
    }, [fridgeItem])

    const handleUsedChange = async (event) => {
        event.preventDefault()

        setIsUsed(event.target.checked)

        const data = {
            name: fridgeItem[1].name,
            quantity: fridgeItem[1].quantity,
            used: event.target.checked,
            forRecipe: fridgeItem[1].forRecipe,
        }

        updateFridgeItem(data)
    }

    const handleForRecipeChange = async (event) => {
        event.preventDefault()

        setForRecipe(event.target.value)

        const data = {
            name: fridgeItem[1].name,
            quantity: fridgeItem[1].quantity,
            used: fridgeItem[1].used,
            forRecipe: event.target.value,
        }
        updateFridgeItem(data)
    }

    const updateFridgeItem = useCallback(
        async (data) => {
            set(ref(database, 'Fridge/' + fridgeItem[1].name), data)
        },
        [fridgeItem]
    )

    const handleDeleteItem = () => {
        remove(ref(database, 'Fridge/' + fridgeItem[1].name))
    }

    //////////////////////////
    // Handle Cart Buttons ///
    //////////////////////////

    useEffect(() => {
        if (selectAll) {
            setIsUsed(true)

            const data = {
                name: fridgeItem[1].name,
                quantity: fridgeItem[1].quantity,
                used: true,
                forRecipe: fridgeItem[1].forRecipe,
            }

            updateFridgeItem(data)
        }
    }, [selectAll, fridgeItem, updateFridgeItem])

    useEffect(() => {
        if (clearAll) {
            setIsUsed(false)

            const data = {
                name: fridgeItem[1].name,
                quantity: fridgeItem[1].quantity,
                used: false,
                forRecipe: fridgeItem[1].forRecipe,
            }

            updateFridgeItem(data)
        }
    }, [clearAll, fridgeItem, updateFridgeItem])

    return (
        <div className={`${generalStyles.item} ${generalStyles.grid}`}>
            <Checkbox
                checked={isUsed}
                onChange={handleUsedChange}
                className={generalStyles.checkbox}
            />
            <div>{fridgeItem[1].name}</div>
            <div>{fridgeItem[1].quantity}</div>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={forRecipe + ''}
                onChange={handleForRecipeChange}
                defaultValue={''}
                className={generalStyles.select}
            >
                <MenuItem value={'--'}>--</MenuItem>
                {recipes.map((recipe, index) => {
                    return (
                        <MenuItem value={recipe[0]} key={index}>
                            {recipe[0]}
                        </MenuItem>
                    )
                })}
            </Select>
            <Delete
                onClick={handleDeleteItem}
                className={generalStyles.remove}
            />
        </div>
    )
}
