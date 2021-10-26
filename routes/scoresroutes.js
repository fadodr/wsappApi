const express = require('express')
const router = express.Router()
const scorecontroller = require('../controllers/scorecontroller')


router.post('/', scorecontroller.add_score)
router.get('/', scorecontroller.get_scores)
router.get('/:id', scorecontroller.get_single_score)
router.delete('/:id', scorecontroller.delete_score)
router.put('/:id', scorecontroller.update_score)

module.exports = router;