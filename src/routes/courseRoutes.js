const express = require('express');
const multer = require('../middleware/multer');

const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/CourseController');

const router = express.Router();

// Routes
router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', multer, createCourse); 
router.put('/:id', multer, updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;
