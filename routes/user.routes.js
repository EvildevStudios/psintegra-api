const express = require("express");
const { check } = require("express-validator");
// Import the user controller functions
const { getUsers, getUser, createUser } = require('../controllers/user.controller')
// Import the custom middleware to validate requests
const validateRequest = require("../middlewares/validateRequest");

// Create a router
const router = express.Router();

// Route to get all users
router.get("/", getUsers);

// Route to filter users by id
router.get("/filter", [
    check('id', 'The id is required').not().isEmpty()
], validateRequest, getUser);

// Route to create a new user
router.post("/", [
    check('username', 'The username is required').not().isEmpty(),
    check('email', 'The email is required').isEmail(),
    check('password', 'The password must be at least 6 characters long').isLength({ min: 6 })
], validateRequest, createUser);

module.exports = router;
