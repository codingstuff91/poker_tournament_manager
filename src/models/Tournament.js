const mongoose = require('mongoose')

const tournamentSchema = mongoose.Schema({
    creator : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    dateTime : {
        type : Date,
        required : true
    },
    localization : {
        type : String
    },
    playersMaximumNumber : {
        type : Number,
        required : true
    },
    buyIn : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    players : {
        type : Array
    },
    completed : {
        type : Boolean,
        default : false
    },
},{
    timestamps : true
})

const Tournament = mongoose.model('Tournament',tournamentSchema)

module.exports = Tournament