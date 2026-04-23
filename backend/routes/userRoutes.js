const express = require('express');
const { signUp, login, getMe, updateProfile } = require("../controller/userController.js");
const auth = require("../middleware/auth");
const router = express.Router();

// Auth
router.post('/signup', signUp);
router.post('/login', login);
router.get('/me', auth, getMe);

// Profile
router.put('/profile', auth, updateProfile);

module.exports = router;