import { Button } from '@mui/material'
import React from 'react'

import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div>
            <Button>
                <Link to="/cart">Shopping Cart</Link>
            </Button>
            <Button>
                <Link to="/fridge">Fridge</Link>
            </Button>
            <Button>
                <Link to="/">Planner</Link>
            </Button>
            <Button>
                <Link to="/recipes">Recipes</Link>
            </Button>
        </div>
    )
}
