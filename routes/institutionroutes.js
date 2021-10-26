const express = require('express')
const router = express.Router()
const institutionroutes = require('../controllers/institutioncontroller')


router.post('/', institutionroutes.add_institution)
router.get('/', institutionroutes.get_institutions)
router.delete('/:id', institutionroutes.delete_institutions)
router.put('/:id', institutionroutes.update_institutions)

module.exports = router