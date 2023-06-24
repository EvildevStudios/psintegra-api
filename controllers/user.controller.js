const { auth, db } = require('../config/firebase.config');
const { collection, doc, setDoc, getDoc, getDocs } = require('firebase/firestore');
const { createUserWithEmailAndPassword } = require('firebase/auth');

/**
 * Retrieves all the users from the database
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 */
const getUsers = async (req, res) => {
    try {
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);

        if (snapshot.empty) {
            return res.status(404).json({ message: 'No se encontraron usuarios' });
        }

        const users = [];
        snapshot.forEach((doc) => {
            users.push(doc.data());
        });

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Error obteniendo usuarios' });
    }
};

/**
 * Retrieves a user from the database based on a given id
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 */
const getUser = async (req, res) => {
    try {
        const { id } = req.query;
        const usersRef = collection(db, 'users');
        const querySnapshot = await getDocs(usersRef);

        if (querySnapshot.empty) {
            return res.status(404).json({ message: 'No se encontraron usuarios' });
        }

        const users = [];
        querySnapshot.forEach((doc) => {
            users.push(doc.data());
        });

        const user = users.find((user) => user.uid === id);

        if (!user) {
            return res.status(404).json({ message: 'No se encontró el usuario' });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Error obteniendo usuario' });
    }
};

/**
 * Creates a new user in the database
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 */
const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const usersRef = collection(db, 'users');

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        const userDoc = doc(usersRef, uid);
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
            return res.status(409).json({ message: 'El usuario ya existe' });
        }

        const newUser = {
            uid,
            username,
            email,
        };

        await setDoc(userDoc, newUser);

        return res.status(200).json(newUser);
    } catch (error) {
        return res.status(500).json({ message: 'Error creando usuario' });
    }
};

module.exports = { getUsers, getUser, createUser };
