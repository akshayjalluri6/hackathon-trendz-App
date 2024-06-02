const express = require("express")
const path = require('path')
const {open} = require("sqlite")
const sqlite3 = require("sqlite3")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const dbPath = path.join(__dirname, 'trendz.db')

let db = null

const initializeDbAndServer = async() => {
    try{
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })
        app.listen(5000, () => {
            console.log("Server is running at http://localhost:5000/")
        })
    } catch(e){
        console.log(`DB Error: ${e.message}`)
        process.exit(1)
    }
}

initializeDbAndServer()

//Middleware function
const authenticateToken = (req, res, next) => {
    let jwtToken;
    const authHeader = req.headers['authorization']
    if(authHeader !== undefined){
        jwtToken = authHeader.split(' ')[1]
    }
    if(jwtToken === undefined){
        res.status(401)
        res.send('Invalid Access Token')
    }
    else{
        jwt.verify(jwtToken, 'akshay613', async (err, payload) => {
            if(err){
                res.status(401)
                res.send('Invalid JWT Token')
            }
            else{
                req.username = payload.username
                next()
            }
        })
    }
}

//Get Products API
app.get('/products', authenticateToken, async (req,res) => {
    console.log('Inside get products API')
    const getProductsQuery = `SELECT * FROM products`
    const productsArray = await db.all(getProductsQuery)
    res.send(productsArray)
})

//Get Product API
app.get('/products/:productId', authenticateToken, async(req,res)=>{
    console.log('Inside get product API')
    const {productId} = req.params
    const getProductsQuery = `SELECT * FROM products WHERE product_id = ${productId}`
    const product = await db.get(getProductsQuery)
    res.send(product)
})

//Create User API
app.post('/users', async (req, res) => {
    const { username, password, gender, age, location, phone, email } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const selectUserQuery = `SELECT * FROM users WHERE username = '${username}'`;
        const dbUser = await db.get(selectUserQuery);

        if (dbUser === undefined) {
            // Create user in user table
            const createUserQuery = `
            INSERT INTO
            users(username, password, gender, age, location, phone, email)
            VALUES
            (
                '${username}',
                '${hashedPassword}',
                '${gender}',
                ${age},
                '${location}',
                '${phone}',
                '${email}'
            )`;
            await db.run(createUserQuery);
            res.json({ status: 'ok', message: "User created successfully" });
        } else {
            // Send invalid username as response
            res.status(400).json({ status: 'error', message: "User already exists" });
        }
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ status: 'error', message: "Internal server error" });
    }
});


//Login User API
app.post('/login', async (req,res) => {
    const {username, password} = req.body

    const selectUserQuery = `select * from users where username = '${username}' `

    const dbUser = await db.get(selectUserQuery)

    if(dbUser === undefined){
        res.status(400)
        res.send("Invalid User")
    }
    else{
        //Compare Password
        const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
        
        if(isPasswordMatched === true){
            const payload = {username: username}

            const jwtToken = jwt.sign(payload, 'akshay613')

            res.send({jwtToken})
    }else{
        res.status(400)
        res.send("Invalid Password")
    }
    }
})

//GET User Profile API
app.get('/profile/', authenticateToken, async (req,res) => {
    let {username} = req
    console.log(username)
    const selectUserQuery = `select * from users where username = '${username}'`
    const dbUser = await db.get(selectUserQuery)
    res.send(dbUser)
})

app.get('/know', async (req, res) => {
    const selectUserQuery = `select * from users`
    const dbUser = await db.all(selectUserQuery)
    res.send(dbUser)
})