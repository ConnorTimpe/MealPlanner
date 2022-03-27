import React, { useState, useEffect } from 'react'

//Components
import { Button } from '@mui/material'

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
    const [fridge, setFridge] = useState([])

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

        const fridgeRef = ref(db, 'Fridge')
        onValue(fridgeRef, (snapshot) => {
            const data = snapshot.val()
            let dbFridge = []
            Object.entries(data).forEach((entry) => {
              dbFridge.push(entry)
            })
            setFridge(dbFridge)
        })
    }, [db])

    /////////////////////
    // Handle Buttons ///
    /////////////////////

    const [selectAll, setSelectAll] = useState(false)
    const [clearAll, setClearAll] = useState(false)
    const [addSelectedToFridge, setAddSelectedToFridge] = useState(false)

    const handleSelectAll = () => {
        setSelectAll(true)
    }

    useEffect(() => {
        setSelectAll(false)
    }, [selectAll])

    const handleClearAll = () => {
        setClearAll(true)
    }

    useEffect(() => {
        setClearAll(false)
    }, [clearAll])

    const handleAddSelectedToFridge = () => {
        setAddSelectedToFridge(true)
    }

    useEffect(() => {
        setAddSelectedToFridge(false)
    }, [addSelectedToFridge])

    // const handleDeleteSelected = () => {
    //   console.log("deleting selected....")
    // }

    const displayCartContent = () => {
        return cart.map((cartItem, index) => (
            <CartItem
                key={index}
                item={cartItem}
                recipes={recipes}
                selectAll={selectAll}
                clearAll={clearAll}
                addSelectedToFridge={addSelectedToFridge}
                fridge={fridge}
            />
        ))
    }

    return (
        <div className={styles.shoppingCartContainer}>
            <div className={`${styles.cartHeader}`}>
                <h1>Shopping Cart</h1>
            </div>
            <div>
                <div className={styles.buttonBar}>
                    <AddToCart />
                    <Button onClick={handleSelectAll}>Select All</Button>
                    <Button onClick={handleClearAll}>Clear All</Button>
                    <Button onClick={handleAddSelectedToFridge}>
                        Add Selected To Fridge
                    </Button>
                    {/* <Button onClick={handleDeleteSelected}>Delete Selected</Button> */}
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
