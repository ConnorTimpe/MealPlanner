import React, { useState } from 'react'

//Components
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { TextField } from '@mui/material'

//Firebase
import database from '../../../firebase/Firestore'
import { ref, set } from 'firebase/database'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

export default function AddToCart() {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [itemName, setItemName] = useState('')
    const [quantity, setQuantity] = useState(1)

    const handleAddItem = async (e) => {
        console.log('add item')
        console.log(itemName)
        console.log(quantity)

        e.preventDefault()
        const data = {
            name: itemName,
            quantity: quantity,
            bought: false,
        }

        set(ref(database, 'ShoppingCart/' + itemName), data)
        handleClose();
    }

    const handleItemNameOnChange = (event) => {
        setItemName(event.target.value)
    }

    const handleQuantityOnChange = (event) => {
        setQuantity(event.target.value)
    }

    return (
        <div>
            <Button onClick={handleOpen}>Add To Cart</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Add Item to the Shopping Cart
                        </Typography>
                        <TextField
                            label="Item Name"
                            variant="standard"
                            value={itemName}
                            required
                            focused
                            onChange={handleItemNameOnChange}
                        />
                        <TextField
                            label="Quantity"
                            variant="standard"
                            value={quantity}
                            type="number"
                            onChange={handleQuantityOnChange}
                        />
                        <Button onClick={handleAddItem}>Add</Button>
                        {/* <Typography
                            id="transition-modal-description"
                            sx={{ mt: 2 }}
                        >
                            Duis mollis, est non commodo luctus, nisi erat
                            porttitor ligula.
                        </Typography> */}
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}
