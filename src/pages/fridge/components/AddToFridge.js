import React from 'react'

//Components
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { TextField } from '@mui/material'

//Validation
import * as yup from 'yup'
import { useFormik } from 'formik'

//Firebase
import database from '../../../firebase/Firestore'
import { ref, set } from 'firebase/database'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const validationSchema = yup.object({
    itemName: yup.string('Enter the item name').required('Item name is required'),
    itemQuantity: yup.string('Enter the item quantity').required('Item quantity is required'),
})

export default function AddToFridge() {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const formik = useFormik({
        initialValues: {
            itemName: '',
            itemQuantity: 1,
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            handleAddItem(values);
            resetForm();
        },
    })

    const handleAddItem = async (values) => {
        const itemName = values.itemName;
        const quantity = values.itemQuantity;

        const data = {
            name: itemName,
            quantity: quantity,
            used: false,
            forRecipe: '--',
        }

        set(ref(database, 'Fridge/' + itemName), data)
        handleClose()
    }

    return (
        <div>
            <Button onClick={handleOpen}>Add To Fridge</Button>
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
                        <form onSubmit={formik.handleSubmit}>
                            <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                            >
                                Add Item to the Fridge
                            </Typography>
                            <TextField
                                label="Item Name"
                                name="itemName"
                                variant="standard"
                                required
                                autoFocus
                                value={formik.values.itemName}
                                onChange={formik.handleChange}
                                error={formik.touched.itemName && Boolean(formik.errors.itemName)}
                                helperText={formik.touched.itemName && formik.errors.itemName}
                            />
                            <TextField
                                label="Quantity"
                                name="itemQuantity"
                                variant="standard"
                                type="number"
                                value={formik.values.itemQuantity}
                                onChange={formik.handleChange}
                                error={formik.touched.itemQuantity && Boolean(formik.errors.itemQuantity)}
                                helperText={formik.touched.itemQuantity && formik.errors.itemQuantity}
                            />
                            <Button  type="submit">Add</Button>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}
