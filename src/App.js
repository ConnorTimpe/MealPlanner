import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Fridge from './pages/fridge/components/Fridge'

import Planner from './pages/planner/components/Planner'
import Recipes from './pages/recipes/components/Recipes'
import ShoppingCart from './pages/shopping-cart/components/ShoppingCart'

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/fridge" element={<Fridge />} />
                <Route path="/" element={<Planner />} />
                <Route path="/recipes" element={<Recipes />} />
            </Routes>
        </div>
    )
}

export default App
