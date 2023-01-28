
const userController = require('../controllers/userController')

const verify =require('../verifyToken')
const router = require('express').Router()


router.post('/Register',userController.addUser)
router.post('/login',userController.loginuser)
router.get('/userads',verify,userController.userAds)
router.get('/userdetails',verify,userController.getOneUser)
module.exports = router;
