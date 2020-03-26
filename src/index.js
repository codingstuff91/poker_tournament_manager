const express = require('express')
require('./db/mongoose')

const app = express()
const port = process.env.port || 3000

const tournamentRouter = require('./routers/tournamentRouter')
const userRouter = require('./routers/userRouter')

app.use(express.json())
app.use(userRouter)
app.use(tournamentRouter)

app.listen(port,()=>{
    console.log("server is up on the port " + port);
})