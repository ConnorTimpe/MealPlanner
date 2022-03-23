import { useState, useEffect } from 'react'

import { getDatabase, ref, set, onValue } from 'firebase/database'
import { initializeApp } from 'firebase/app'

const Firestore = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [recipes, setRecipes] = useState([])

    const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
    }

    const app = initializeApp(firebaseConfig)

    // Get a reference to the database service
    const db = getDatabase(app)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            name: name,
            desciption: description,
        }

        set(ref(db, 'Recipes/' + name), data)
    }

    useEffect(() => {
        //Working, read once
        // const dbRef = ref(getDatabase())
        // get(child(dbRef, `Recipes`))
        //     .then((snapshot) => {
        //         if (snapshot.exists()) {
        //             console.log(snapshot.val())
        //             setRecipes(snapshot.val())
        //         } else {
        //             console.log('No data available')
        //         }
        //     })
        //     .catch((error) => {
        //         console.error(error)
        //     })

        const recipesRef = ref(db, 'Recipes')
        onValue(recipesRef, (snapshot) => {
            const data = snapshot.val()
            setRecipes(data)
        })
    }, [db])

    useEffect(() => {
        console.log(recipes)
    }, [recipes])

    return (
        <div>
            <center>
                <form
                    style={{ marginTop: '200px' }}
                    onSubmit={(event) => {
                        handleSubmit(event)
                    }}
                >
                    <input
                        type="text"
                        placeholder="Recipe Name"
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                    <br />
                    <br />
                    <input
                        type="text"
                        placeholder="Recipe Description"
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                    />
                    <br />
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </center>
        </div>
    )
}

export default Firestore
