import React, { useState, useEffect } from 'react'

//Components
import FridgeItem from './FridgeItem'
import { Button } from '@mui/material'
import AddToFridge from './AddToFridge'

//firebase
import database from '../../../firebase/Firestore'
import { ref, onValue } from 'firebase/database'

//Styles
import styles from '../styles/fridge.module.scss'
import generalStyles from '../../shared/styles/generalStyles.module.scss'

export default function Fridge() {
    const db = database

    const [fridge, setFridge] = useState([])
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        const fridgeRef = ref(db, 'Fridge')
        onValue(fridgeRef, (snapshot) => {
            const data = snapshot.val()
            let dbFridge = []
            Object.entries(data).forEach((entry) => {
                dbFridge.push(entry)
            })
            setFridge(dbFridge)
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

    /////////////////////
    // Handle Buttons ///
    /////////////////////

    const [selectAll, setSelectAll] = useState(false)
    const [clearAll, setClearAll] = useState(false)

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

    const handleDeleteSelected = () => {
        console.log('deleting selected....')
    }

    const displayFridgeContent = () => {
        return fridge.map((item, index) => (
            <FridgeItem
                fridgeItem={item}
                key={index}
                recipes={recipes}
                selectAll={selectAll}
                clearAll={clearAll}
            />
        ))
    }

    return (
        <div className={generalStyles.container}>
            <div className={`${generalStyles.header}`}>
                <h1>Fridge</h1>
            </div>
            <div>
                <div className={generalStyles.buttonBar}>
                    <AddToFridge />
                    <Button onClick={handleSelectAll}>Select All</Button>
                    <Button onClick={handleClearAll}>Clear All</Button>
                    <Button onClick={handleDeleteSelected}>Remove Used</Button>
                </div>
                <div
                    className={`${generalStyles.tableHeader} ${generalStyles.grid}`}
                >
                    <h3>Bought</h3>
                    <h3>Item</h3>
                    <h3>Quantity</h3>
                    <h3>For</h3>
                </div>
                <div className={generalStyles.content}>
                    {displayFridgeContent()}
                </div>
            </div>
        </div>
    )
}
