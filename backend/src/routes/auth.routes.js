const express = require('express');
const { registerUser, loginUser } = require('../controllers/auth.controller');

// Naye imports
const { validate } = require('../middlewares/validate.middleware');
const { registerSchema, loginSchema } = require('../validators/auth.validator');

const router = express.Router();

// Route ke beech mein 'validate' middleware laga do
router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);

module.exports = router;