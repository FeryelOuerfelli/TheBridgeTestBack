const express = require('express');
const { submitContactForm, getContactForms } = require('../controllers/ContactController');

const router = express.Router();

router.post('/', submitContactForm);

router.get('/', getContactForms);

module.exports = router;
