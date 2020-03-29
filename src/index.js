const path = require('path')
const express = require('express');
const bodyParser = require('body-parser')
const hbs = require('hbs')

require('dotenv').config();

const app = express();
const port = process.env.port || 3000;

const tournamentRouter = require('./routers/tournamentRouter');
const userRouter = require('./routers/userRouter');

// Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../src/views');
const partialsPath = path.join(__dirname, '../src/views/partials')

app.use(express.json());
app.use(userRouter);
app.use(tournamentRouter);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//body parser middleware
app.use(bodyParser.urlencoded({
   extended: true
 }));
app.use(bodyParser.json());

// Define the view engine and directory
app.set('views',viewsPath);
app.set('view engine','hbs');
hbs.registerPartials(partialsPath)

app.get('/',(req,res)=>{
   res.render('home', {
      title : "Accueil"
   })
})

app.listen(port, () => {
   console.log("server is up on the port " + port);
});