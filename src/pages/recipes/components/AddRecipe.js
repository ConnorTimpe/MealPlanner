import React, { useState } from 'react'

//Components
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Chip, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'

//Uuid
import { v4 as uuidv4 } from 'uuid'

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
    name: yup
        .string('Enter the recipe name')
        .required('Recipe name is required'),
    // ingredients: yup
    //     .string('Enter the recipe ingredients')
    //     .required('At least 1 ingredient is required'),
})

export default function AddRecipe() {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    
    const [ingredients, setIngredients] = useState([]);

    const formik = useFormik({
        initialValues: {
            name: '',
            ingredients: [],
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            console.log("submit...")
            handleAddItem(values)
            resetForm()
        },
    })


    const handleAddItem = async (values) => {
        console.log("adding recipe...")
        const name = values.name

        const data = {
            name,
            ingredients
        }

        const uuid = uuidv4()

        set(ref(database, 'Recipes/' + uuid), data)
        handleClose()
    }

    const handleSubmit =() => {
        console.log("clicked")
    }

    return (
        <div>
            <Button onClick={handleOpen}>Add New Recipe</Button>
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
                                Create New Recipe
                            </Typography>
                            <TextField
                                label="Recipe Name"
                                name="name"
                                variant="standard"
                                required
                                autoFocus
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.name &&
                                    Boolean(formik.errors.name)
                                }
                                helperText={
                                    formik.touched.name && formik.errors.name
                                }
                            />
                            <Autocomplete
                                multiple
                                freeSolo
                                id="ingredients"
                                label="Ingredients"
                                name="ingredients"
                                value={ingredients}
                                onChange={(event, newValue) => {
                                    setIngredients(newValue)
                                }}
                                options={[]}
                                getOptionLabel={(option) => option}
                                renderTags={(tagValue, getTagProps) =>
                                    tagValue.map((option, index) => (
                                        <Chip
                                            label={option}
                                            {...getTagProps({ index })}
                                        />
                                    ))
                                }
                                style={{ width: 500 }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Ingredients"
                                        placeholder="Ingredients"
                                    />
                                )}
                            />
                            <Button type="submit" onClick={handleSubmit}>Add</Button>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}
