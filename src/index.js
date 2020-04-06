const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

const tournamentRouter = require('./routers/tournamentRouter');
const userRouter = require('./routers/userRouter');

// Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(cors());
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

app.get('/test',(req,res)=>{
   res.send('Hello from the server !')
})

app.listen(port, () => {
   console.log("server is up on the port " + port);
});