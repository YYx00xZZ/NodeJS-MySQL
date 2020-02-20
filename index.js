const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const port = 3001

const app = express()                               //this is our express app
app.use(bodyParser.json())                          //setting our app to use body-parse, set body-parser to work with json data in the request
app.use(bodyParser.urlencoded({extended: false}))   //ody-parser DOES NOT encode data in the url
app.set('view engine', 'pug')                       //set app for use with the pug 

//create connection to mysql server
function getConn() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'nodejs-mysql'    
    })
}

// var db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'nodejs-mysql'    
// })

app.get('/', (req, res) => {
    res.render('login', { title: 'Homepage', message: 'Helllo'})
})

app.post('/login', function(req, res) {
    email = req.body.email,
    password = req.body.password
   
    //connect to the database
    var connection = getConn()
    connection.connect()
    if (email && password) {
        connection.query('SELECT * FROM user_accounts WHERE email = ? AND password',[email, password],function(err, rows, fields){
            console.log(rows)
            if (!err) {
                res.email = email
                res.status(200).send("WELCOME LOGNA SA")
            } else {
                res.send('Incorrect credentials.')
            }
            // res.end()

        })
    }else {
        res.send('Please enter valid credentials')
        res.end()
    }

    // connection.close()
})
app.listen(port, () => {
    console.log(`HTTP server listening on ${port}`)
})