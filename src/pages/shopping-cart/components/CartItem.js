import React, { useState, useEffect } from 'react'

//Components
import { Checkbox, MenuItem, Select } from '@mui/material'

//Icons
import { ReactComponent as Delete } from '../../../resources/icons/clear.svg'

//Firebase
import database from '../../../firebase/Firestore'
import { ref, set, remove } from 'firebase/database'

//Styles
import styles from '../styles/shoppingCart.module.scss'

export default function CartItem({ item, recipes }) {
    console.log('cart item')
    console.log(item)
    console.log(recipes)

    const [isBought, setIsBought] = useState(item[1].bought)
    const [forRecipe, setForRecipe] = useState(item[1].forRecipe)

    useEffect(() => {
        setIsBought(item[1].bought)
        setForRecipe(item[1].forRecipe)
    }, [item])

    const handleBoughtChange = async (event) => {
        event.preventDefault()

        setIsBought(event.target.checked)

        const data = {
            name: item[1].name,
            quantity: item[1].quantity,
            bought: event.target.checked,
            forRecipe: item[1].forRecipe,
        }

        updateCartItem(data)
    }

    const handleForRecipeChange = async (event) => {
        event.preventDefault()

        setForRecipe(event.target.value)

        const data = {
            name: item[1].name,
            quantity: item[1].quantity,
            bought: item[1].bought,
            forRecipe: event.target.value,
        }
        updateCartItem(data)
    }

    const updateCartItem = async (data) => {
        set(ref(database, 'ShoppingCart/' + item[1].name), data)
    }

    const handleDeleteItem = () => {
        remove(ref(database, 'ShoppingCart/' + item[1].name))
    }

    return (
        <div className={`${styles.cartItem} ${styles.cartGrid}`}>
            <Checkbox
                checked={isBought}
                onChange={handleBoughtChange}
                className={styles.checkbox}
            />
            <div>{item[1].name}</div>
            <div>{item[1].quantity}</div>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={forRecipe + ''}
                onChange={handleForRecipeChange}
                defaultValue={''}
                className={styles.select}
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
            <Delete onClick={handleDeleteItem} className={styles.remove}/>
        </div>
    )
}
