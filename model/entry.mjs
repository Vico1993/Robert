import mongoose from 'mongoose'

let Schema = mongoose.Schema;

let EntrySchema = new Schema({
    _id: Schema.Types.ObjectId,
    text: {
        type: String,
        required: true
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }]
})

export const Entry = mongoose.model( 'Entry', EntrySchema )