import React, { useState } from 'react'
import AddToFridge from './AddToFridge'

export default function Fridge() {
    const [inFridge, setInFridge] = useState(['milk', 'mushrooms'])

    const displayInFridge = () => {
        return inFridge.map((item, index) => {
            return <div key={index}>{item}</div>
        })
    }

    return (
        <div>
            <h1>Fridge</h1>
            {displayInFridge()}
            <AddToFridge />
        </div>
    )
}
