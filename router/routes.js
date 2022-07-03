const router = require('express').Router()

const { createProductCotroller, getProductsCotroller, updateProductCotroller, deleteProductCotroller } = require('../controllers/productController')
const { signupController, siginController, getUserWithToken } = require('../controllers/userController')
const {authenticate,authorizeRoute} = require('../services/authenticationService')

router.post('/api/v1/signup',signupController)
router.post('/api/v1/signin',siginController)

router.get('/api/v1/user/get',authenticate,getUserWithToken)
router.post('/api/v1/products',authenticate,authorizeRoute('createProductCotroller'),createProductCotroller)
router.get('/api/v1/products',authenticate,authorizeRoute('getProductsCotroller'),getProductsCotroller)
router.put('/api/v1/products',authenticate,authorizeRoute('updateProductCotroller'),updateProductCotroller)
router.delete('/api/v1/products',authenticate,authorizeRoute('deleteProductCotroller'),deleteProductCotroller)
module.exports =  router