const postController = require('../controllers/PostController.js')

const verify =require('../verifyToken')
const router = require('express').Router()
const upload = require('../imageupload')


router.post('/addpost',verify,upload.single("image"),postController.addPost)
router.get('/allposts',postController.getPosts)
router.put('/like/:id',verify,postController.setLikes)
router.get('/:id' ,postController.getOnePost)


module.exports = router;
