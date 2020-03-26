const mongoose = require('mongoose')

const mongoose_db = process.env.DATABASE_URL

mongoose.connect(mongoose_db,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false
})