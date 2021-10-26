const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/usercontroller')

router.post('/signup', usercontroller.signup)
router.post('/finduser', usercontroller.get_user)
router.post('/login', usercontroller.login)
router.put('/updateuser/:id', usercontroller.updateuser)
router.put('/changepassword/:id', usercontroller.changepassword)
router.post('/forgetpassword', usercontroller.forget_password)
router.post('/resetpassword', usercontroller.reset_password)

module.exports = router