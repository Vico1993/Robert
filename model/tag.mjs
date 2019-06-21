import mongoose from 'mongoose'

let Schema = mongoose.Schema;

let TagSchema = new Schema({
    _id: Schema.Types.ObjectId,
    tag: {
        type: String,
        required: true
    }
})

export const Tag = mongoose.model( 'Tag', TagSchema )