const express = require('express');
const { getPublicShareDetails } = require('../controllers/share.controller');

const router = express.Router();

// Public GET request for sharing -> http://localhost:5000/api/share/:productId
router.get('/:productId', getPublicShareDetails);

module.exports = router;