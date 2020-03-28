const path = require('path')
const express = require('express');
const bodyParser = require('body-parser')
const hbs = require('hbs')


require('dotenv').config();

const app = express();
const port = process.env.port || 3000;

const tournamentRouter = require('./routers/tournamentRouter');
const userRouter = require('./routers/userRouter');
const viewsPath = path.join(__dirname, '../src/views');

app.use(express.json());
app.use(userRouter);
app.use(tournamentRouter);

//body parser middleware
app.use(bodyParser.urlencoded({
   extended: true
 }));
app.use(bodyParser.json());

// Define the view engine and directory
app.set('views',viewsPath);
app.set('view engine','hbs');

app.get('/',(req,res)=>{
   res.render('home')
})

app.listen(port, () => {
   console.log("server is up on the port " + port);
});