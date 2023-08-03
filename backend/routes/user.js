const express = require('express')
const router = express.Router()
const {register, login, dashboard, logout, createPost, getPosts, getSinglePost, updatePost} = require('../controllers/user')
const multer = require('multer')  
const uploadMiddleware = multer({ dest: 'uploads/'})


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/dashboard').get(dashboard)

router.route('/post/:id')
  .get(getSinglePost)
  .put(uploadMiddleware.single('file'), updatePost);

// router.route('/post/:id').get(getSinglePost)
// router.route('/post/:id').put(uploadMiddleware.single('file'), updatePost)
router.route('/getPosts').get(getPosts)
router.route('/createPost').post(uploadMiddleware.single('file'), createPost)


// router.route('/login').post(login)


module.exports = router

// const { dashboard } = require('../controllers/dashboard')
// const authMiddleware = require('../middlewares/auth')
// const secureRoute = require("../middlewares/checkAuth")