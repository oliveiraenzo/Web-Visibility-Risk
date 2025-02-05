const express = require('express');
const router = express.Router();
const { getVulnerabilities } = require('../controllers/osintController');

// Rota para buscar as vulnerabilidades
router.post('/get-vulnerabilities', getVulnerabilities);

module.exports = router;
