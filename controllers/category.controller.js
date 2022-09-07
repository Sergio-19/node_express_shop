const mysql = require('mysql')

class CategoryController {

    async getCategory(req, res) {
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

        const catId = req.query.id    

    let cat = new Promise((resolve, reject)=> {
        connection.query(`SELECT * FROM category WHERE id = '${catId}'`, (error, result)=> {
            if(error) {
                reject(error)
            } else {
                resolve(result)       
            }
        })
        
    })

    let goods = new Promise((resolve, reject)=> {
        connection.query(`SELECT * FROM goods WHERE category = '${catId}'`, (error, result)=> {
            if(error) {
                reject(error)
            } else {
                resolve(result)       
            }
        })
    })

    Promise.all([cat, goods]).then((value)=> {
        let cat = JSON.parse(JSON.stringify(value[0]))[0]
        let goods = JSON.parse(JSON.stringify(value[1]))
        res.render('cat.pug', {cat, goods})
        connection.end((error)=> {
            if(error){
                console.log(`Ошибка ${error}`)
            } else {
                console.log('Подключение закрыто')
            }
        })
    })

    }

    async getCategoryAPI(req, res) {

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

       await connection.query(`SELECT * FROM category`, (error, result)=> {
            if(error) {
                console.log(error)
            } else {
                const category = JSON.parse(JSON.stringify(result))
                res.json({"category": category})       
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





module.exports = new CategoryController()