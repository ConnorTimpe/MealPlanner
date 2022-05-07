import React, { useState } from 'react'

//Components
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import KitchenIcon from '@mui/icons-material/Kitchen'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import LogoutIcon from '@mui/icons-material/Logout'

//Auth
import { signOut } from 'firebase/auth'
import { auth } from '../../../firebase/Firestore'

//Hooks
import { useNavigate } from 'react-router-dom'

export default function BottomNavigationBar() {
    const navigate = useNavigate()

    function handleNavigate(target) {
        navigate(target)
    }

    const [value, setValue] = useState(0)

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                width: '100%',
            }}
        >
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue)
                    handleNavigate(newValue)
                }}
            >
                <BottomNavigationAction
                    label="Cart"
                    value={'/cart'}
                    icon={<ShoppingCartIcon />}
                />
                <BottomNavigationAction
                    label="Fridge"
                    value={'/fridge'}
                    icon={<KitchenIcon />}
                />
                <BottomNavigationAction
                    label="Planner"
                    value={'/'}
                    icon={<CalendarMonthIcon />}
                />
                <BottomNavigationAction
                    label="Recipes"
                    value={'/recipes'}
                    icon={<MenuBookIcon />}
                />
                <BottomNavigationAction
                    label="Log Out"
                    // value={'/recipes'}
                    onClick={() => signOut(auth)}
                    icon={<LogoutIcon />}
                />
            </BottomNavigation>
        </Box>
    )
}
