const express = require('express');
const mysql = require('mysql')
const app = express();
const GoodsController = require('./controllers/goods.controller')
const CategoryController = require('./controllers/category.controller')
const CategoryRouter = require('./routes/category.router')
const GoodsRouter = require('./routes/goods.router')

app.listen(3002, ()=> {
    console.log("Server has been started...")
})

app.set('view engine', 'pug')

app.use(express.json())


app.use(express.static('public'))

app.get('/', (req, res)=> {
    GoodsController.getGoods(req, res)
})

app.get('/goods', (req, res)=> {
    GoodsController.getGood(req, res)
})

app.get('/cat', (req, res)=> {
    CategoryController.getCategory(req, res)
})


/*API */

app.use('/category', CategoryRouter)
app.use('/goods', GoodsRouter)

/*API */








