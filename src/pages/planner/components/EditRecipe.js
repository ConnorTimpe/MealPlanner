import React, { useState } from 'react'
import {  ref, set } from 'firebase/database'
import database from '../hooks/useGetDatabase'

export default function EditRecipe() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
  

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            name: name,
            // ingredients: ingredients,
            desciption: description,
        }

        set(ref(database, 'Recipes/' + name), data)
    }

    return <div>EditRecipe</div>
}
