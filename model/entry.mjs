import mongoose from 'mongoose'

let Schema = mongoose.Schema;

let EntrySchema = new Schema({
    text: {
        type: String,
        required: true
    }
})

export const Entry = mongoose.model( 'entry', EntrySchema )