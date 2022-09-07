const Router = require('express')
const router = new Router()
const CategoryController = require('../controllers/category.controller')


router.post('/list', CategoryController.getCategoryAPI)





module.exports = router;