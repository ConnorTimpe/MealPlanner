import { Button } from '@mui/material'
import React from 'react'

export default function AddRecipe() {
    const handleAddRecipe = (event) => {
        console.log("add recipe clicked");
    }
    return (
        <div>
            <Button onClick={handleAddRecipe}>Add Recipe</Button>
        </div>
    )
}
