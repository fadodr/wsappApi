const express = require('express')
const router = express.Router()
const questioncontroller = require('../controllers/questioncontroller')

router.post('/', questioncontroller.add_question)
router.get('/', questioncontroller.get_questions)
router.get('/:id', questioncontroller.get_single_question)
router.delete('/:id', questioncontroller.delete_question)
router.put('/:id', questioncontroller.update_question)


module.exports = router