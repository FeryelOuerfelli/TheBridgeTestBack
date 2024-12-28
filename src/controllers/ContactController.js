const Contact = require('../models/contact');

// Handle contact form submission
const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit contact form', error: error.message });
  }
};

// Get all contact form submissions (for admin dashboard)
const getContactForms = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ date: -1 }); // Sort by most recent
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch contact forms', error: error.message });
  }
};

module.exports = {
  submitContactForm,
  getContactForms,
};
