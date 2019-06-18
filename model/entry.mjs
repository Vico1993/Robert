import mongoose from 'mongoose'

let Schema = mongoose.Schema;

let Entry = new Schema({
    text: {
        type: String,
        required: true
    }
})

let Model = mongoose.model( 'entry', Entry )
module.exports = Model