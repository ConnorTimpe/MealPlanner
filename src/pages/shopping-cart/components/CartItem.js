import React, { useState } from 'react'

//Components
import { Checkbox } from '@mui/material'

//Firebase
import database from '../../../firebase/Firestore'
import { ref, set } from 'firebase/database'

//Styles
import styles from '../styles/shoppingCart.module.scss'

export default function CartItem({ item }) {
    console.log('cart item')
    console.log(item)

    const [isBought, setIsBought] = useState(item[1].bought)

    const handleChange = async (event) => {
        setIsBought(event.target.checked)

        event.preventDefault()
        const data = {
            name: item[1].name,
            quantity: item[1].quantity,
            bought: event.target.checked,
        }

        set(ref(database, 'ShoppingCart/' + item[1].name), data)
    }

    return (
        <div className={styles.cartItem}>
            <Checkbox checked={isBought} onChange={handleChange} />
            <div>{item[1].name}</div>
            <div>{item[1].quantity}</div>
        </div>
    )
}
