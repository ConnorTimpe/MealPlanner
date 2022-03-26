import React, { useState } from 'react'

//Components
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

//Hooks
import useWindowDimensions from '../hooks/useWindowDimensions'

//Styles
import styles from '../styles/header.module.scss'

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

export default function Header() {
    const { width } = useWindowDimensions()

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const getHeaderContent = () => {
        if (width < 525) {
            return (
                <div>
                    <Button onClick={handleOpen}>Open modal</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                            >
                                Text in a modal
                            </Typography>
                            <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                            >
                                Duis mollis, est non commodo luctus, nisi erat
                                porttitor ligula.
                            </Typography>
                        </Box>
                    </Modal>
                </div>
            )
        } else {
            return (
                <div className={styles.headerContainer}>
                    <Button>
                        <Link to="/cart">Cart</Link>
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
    }

    return getHeaderContent()
}
