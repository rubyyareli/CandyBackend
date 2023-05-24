const express=require("express");
//const mysql = require('mysql');// marca error
const mysql = require('mysql2');
const myconn = require('express-myconnection');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const routes = require('./routes/USER_TYPES.routes')
const routesU = require('./routes/USERS.routes')
const routesS = require('./routes/SECTIONS.routes')
const routesC = require('./routes/CARDS.routes')
const routesP = require('./routes/PRODUCTS.routes')
const routesCA = require('./routes/CARRITO.routes') 

const app = express();
app.set('port', process.env.PORT || 9000);

const dbOptions = {
    host: 'srv1026.hstgr.io', //
    port: 5000,
    user: 'u337397135_rubyyareli', //
    password: 'n44jWY]8pE', //nueva contrase;a
    database: 'u337397135_chococandy' //
}

//*****\\middlewares//*****\\
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())
app.use(cors());

//*****\\routes//*****\\
app.get('/',(req, res)=>{
    res.send('Bienvenido oiga')
})

app.use('/USER_TYPE', routes)
app.use('/USER', routesU)
app.use('/SECTION', routesS)
app.use('/CARD', routesC)
app.use('/PRODUCT', routesP)
app.use('/CARRITO', routesCA)

/////////////////////////////////////////////////////////////////////////////////
app.get('/test', (req,res) => {
    res.send('¡Hola Desarrollador!')
 })

 app.post('/signup' , (req,res) => {
    jwt.sign(req.body , 'secret_key' , (err,token) => 
    {
       if(err)
       {
          res.status(400).send({msg : 'Error'})
       }
        else 
        {
          res.send({msg:'success' , token: token})
       }
    })
 })

 function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(403);
    jwt.verify(token, "secret_key", (err, user) => {
       if (err) return res.sendStatus(404);
       req.user = user;
       next();
    });
 }
 app.post('/login' , verifyToken , (req,res) => {
    res.send('You are Authorized!')
 })

 app.put("/logout", verifyToken, function (req, res) {
    const authHeader = req.headers["authorization"];
    jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
       if (logout) {
          res.send({msg : 'Has sido desconectado' });
       } else {
          res.send({msg:'Error'});
       }
    });
 });
/////////////////////////////////////////////////////////////////////////////////

//*****\\server running//*****\\
app.listen(app.get('port'), ()=>{
    console.log('server running on port', app.get('port'))
}); 
