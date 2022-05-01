const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const favoriteSchema = mongoose.Schema({
    userfrom:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: String,
    movieTitle: String,
    moviePost: String,
    key:String
})

const Favorite = mongoose.model('Favorite',favoriteSchema)

module.exports = {Favorite}