import mongoose from 'mongoose'
import {Entry, Tag} from './../model'

/**
 * Add Command
 *
 * @param {Context} ctx Telegraf Context of the Message
 */
export const add = async ( ctx ) => {
    let text = ctx.update.message.text
    const tmp = text.split( " " )
    let tags = [] 

    let entry = new Entry(
        {
            _id: new mongoose.Types.ObjectId(),
            text: "",
            tags: [] 
        }
    )

    // Start to explore the command on key 1 because the key 0 it's the command
    for (let i = 1; i < tmp.length; i++) {
        const elm = tmp[i]

        if ( elm == undefined ) {
            continue
        }

        // hastag
        if ( elm.includes( "#" ) ) {
            tags.push( elm )
            continue
        }

        if ( entry.text == "" ) {
            entry.text = elm
        }
    }

    if ( tags.length > 0 ) {
        for ( let tag of tags ) {
            const newTag = new Tag({
                _id: new mongoose.Types.ObjectId(),
                tag: tag
            })

            entry.tags.push( newTag._id )

            newTag.save()
        }

        entry.save( err => {
            if ( err ) {
                return console.error( err )
            }

            ctx.reply( "Hum.. Okay it's done" )
        })
    }
}