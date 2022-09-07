const mysql = require('mysql')


class GoodsController {

    async getGoods(req, res) {
        const connection =  mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'test_shop'
        })
        
      await connection.connect((error)=> {
        if(error){
            return console.log('Ошибка подключения к базе данных!')
        } else {
            return console.log('Подключение успешно')
        }
        })
    
        await connection.query(`SELECT * FROM goods`, (error, result)=> {
            if(error) {
                console.log(`Ошибка запроса к базе данных ${error}`)
            } else {
                let goods = {}
                result.forEach((good) => {
                    goods[good.id] = {id: good.id,
                                      name: good.name,
                                      description: good.description,
                                      cost: good.cost,
                                      image: good.image,
                                      category: good.category  
                                     }
                })
                
                res.render('main.pug', {goods: goods})
    
                    
            }
        })
    
        connection.end((error)=> {
        if(error){
            console.log(`Ошибка ${error}`)
        } else {
            console.log('Подключение закрыто')
        }
    })
    }


    async getGood(req, res) {
        const connection =  mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'test_shop'
        })
        
      await connection.connect((error)=> {
        if(error){
            return console.log('Ошибка подключения к базе данных!')
        } else {
            return console.log('Подключение успешно')
        }
        })

        let goodId = req.query.id

       let good = new Promise((resolve, reject)=> {
        connection.query(`SELECT * FROM goods WHERE id = '${goodId}'`, (error, result)=> {
            if(error) {
                reject(error)
            } else {
                resolve(result)    
            }
        })
       }) 
    good.then((value)=> {
        let good = JSON.parse(JSON.stringify(value[0]))
        res.render('good.pug', {good})

        connection.end((error)=> {
            if(error){
                console.log(`Ошибка ${error}`)
            } else {
                console.log('Подключение закрыто')
            }
        })
    })
        
    }

    async getCartInfo(req, res) {
        const connection =  mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'test_shop'
        })
        
      await connection.connect((error)=> {
        if(error){
            return console.log('Ошибка подключения к базе данных!')
        } else {
            return console.log('Подключение успешно')
        }
        })

        let goodsArray = []
        let cart = req.body.key
             
            await connection.query(`SELECT * FROM goods WHERE id IN (`+ cart.join(',') + `)`, (error, result)=> {
                    if(error) {
                        console.log('Произошла ошибка при запросе', error)
                    } else {
                        let goods = {}
                        result.forEach((good)=> {
                            goods[good.id] = good
                        })
                     res.json({"info": goods})
                    }
            })
   
        connection.end((error)=> {
            if(error){
                console.log(`Ошибка ${error}`)
            } else {
                console.log('Подключение закрыто')
            }
        })
    }



}

module.exports = new GoodsController();