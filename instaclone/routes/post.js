const postController = require('../controllers/PostController.js')

const verify =require('../verifyToken')
const router = require('express').Router()
const upload = require('../imageupload')


router.post('/addpost',verify,upload.single("image"),postController.addPost)
router.get('/allposts',postController.getPosts)
router.get('/:id' ,postController.getOnePost)
//router.put('/:id',verify,upload.single("image"),postController.updateAdvertisment)
//router.delete('/:id',verify,postController.deleteAdvertisment)

module.exports = router;
