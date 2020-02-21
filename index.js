const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const port = 3001
const pug = require('pug')

const app = express()                               //this is our express app
app.use(bodyParser.json())                          //setting our app to use body-parse, set body-parser to work with json data in the request
app.use(bodyParser.urlencoded({extended: false}))   //ody-parser DOES NOT encode data in the url
app.set('view engine', 'pug')                       //set app for use with the pug 

//create connection to mysql server
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs-mysql'    
}) 

    // DEBUG PURPOSE
// db.query('<query here>', function (err, rows, fields) {
//     if (err) throw err
//     console.log('The solution is: ', rows[0].solution)
// })

const compiledFunction = pug.renderFile('./views/index.pug', {
    title: "Hi test",
    message: "Working"
});

app.get('/', (req, res) => {
    // pug.render('index', { title: 'Homepage', message: 'Helllo'})
    res.send(compiledFunction)
})

app.post('/login', function(req, res) {
    email = req.body.email,
    password = req.body.password
    console.log(email)
    //connect to the database
    db.connect(() => {console.log("connected")})

    if (email && password) {
        db.query('SELECT * FROM user_accounts WHERE email = ? AND password',[email, password],function(err, rows, fields){
            // console.log(err)
            if (err) {
                // console.log('The solution is: ', rows[0].solution)
                res.status(500).send("Internal server error")
                throw err
            }
            
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
        // res.end()
    }

    // db.end()
})
app.listen(port, () => {
    console.log(`HTTP server listening on ${port}`)
})