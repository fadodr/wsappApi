const express = require('express')
const router = express.Router()
const facultycontroller = require('../controllers/facultycontroller')
const multer = require('multer')

router.post('/', facultycontroller.add_faculty)
router.get('/', facultycontroller.get_faculty)
router.get('/:id', facultycontroller.get_single_faculty)
router.delete('/:id', facultycontroller.delete_faculty)
router.put('/:id', facultycontroller.update_faculty)


module.exports = router