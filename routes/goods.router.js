const Router = require('express')
const router = new Router()
const GoodsController = require('../controllers/goods.controller')


router.post('/cart', GoodsController.getCartInfo)



module.exports = router