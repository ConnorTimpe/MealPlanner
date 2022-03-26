import React, { useState, useEffect } from 'react'

//Components
import { Button } from '@mui/material'
import Header from '../../shared/components/Header'

//firebase
import database from '../../../firebase/Firestore'
import { ref, onValue } from 'firebase/database'

//Styles
import styles from '../styles/shoppingCart.module.scss'
import AddToCart from './AddToCart'
import CartItem from './CartItem'

export default function ShoppingCart() {
    const [cart, setCart] = useState([])
    const [recipes, setRecipes] = useState([])

    const db = database

    useEffect(() => {
        const shoppingCartRef = ref(db, 'ShoppingCart')
        onValue(shoppingCartRef, (snapshot) => {
            const data = snapshot.val()
            let dbCart = []
            Object.entries(data).forEach((entry) => {
                dbCart.push(entry)
            })
            setCart(dbCart)
        })

        const recipesRef = ref(db, 'Recipes')
        onValue(recipesRef, (snapshot) => {
            const data = snapshot.val()
            let dbRecipes = []
            Object.entries(data).forEach((entry) => {
                dbRecipes.push(entry)
            })
            setRecipes(dbRecipes)
        })
    }, [db])

    const displayCartContent = () => {
        console.log('displaying cart content')
        console.log(cart)
        return cart.map((cartItem, index) => (
            <CartItem key={index} item={cartItem} recipes={recipes} />
        ))
    }

    return (
        <div>
            <div className={`${styles.cartHeader}`}>
                ShoppingCart
                <Header />
            </div>
            <div className={styles.shoppingCartContainer}>
                <div className={styles.buttonBar}>
                    <AddToCart />
                    <Button>Select All</Button>
                    <Button>Clear All</Button>
                    <Button>Add Selected To Fridge</Button>
                </div>
                <div className={`${styles.cartTableHeader} ${styles.cartGrid}`}>
                    <h3>Bought</h3>
                    <h3>Item</h3>
                    <h3>Quantity</h3>
                    <h3>For</h3>
                </div>
                <div className={styles.cartContent}>{displayCartContent()}</div>
            </div>
        </div>
    )
}
