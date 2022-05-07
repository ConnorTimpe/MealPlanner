import React, { useState, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

//Pages
import Fridge from './pages/fridge/components/Fridge'
import Planner from './pages/planner/components/Planner'
import Recipes from './pages/recipes/components/Recipes'
import BottomNavigationBar from './pages/shared/components/BottomNavigationBar'
import ShoppingCart from './pages/shopping-cart/components/ShoppingCart'

//Auth
import { onAuthStateChanged } from 'firebase/auth'
import { AuthProvider } from './auth/AuthContext'
import { auth } from './firebase/Firestore'
import PrivateRoute from './auth/PrivateRoute'
import Login from './auth/Login'
import Register from './auth/Register'
import VerifyEmail from './auth/VerifyEmail'

function App() {
    const [currentUser, setCurrentUser] = useState(null)
    const [timeActive, setTimeActive] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })
    }, [])

    return (
        <div className="App">
            <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
                <Routes>
                    <Route
                        path="/cart"
                        element={
                            <PrivateRoute>
                                <ShoppingCart />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/fridge"
                        element={
                            <PrivateRoute>
                                <Fridge />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <Planner />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/recipes"
                        element={
                            <PrivateRoute>
                                <Recipes />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            !currentUser?.emailVerified ? (
                                <Login />
                            ) : (
                                <Navigate to="/cart" replace />
                            )
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            !currentUser?.emailVerified ? (
                                <Register />
                            ) : (
                                <Navigate to="/cart" replace />
                            )
                        }
                    />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                </Routes>
                {currentUser?.emailVerified ? <BottomNavigationBar /> : ""}
            </AuthProvider>
        </div>
    )
}

export default App
