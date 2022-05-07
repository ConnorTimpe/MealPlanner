import { getDatabase } from 'firebase/database'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';


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
const database = getDatabase(app)
export default database

export const auth = getAuth(app);

