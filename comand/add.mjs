import {Entry} from './../model/entry'

/**
 * Add Command
 *
 * @param {Context} ctx Telegraf Context of the Message
 */
export const add = ( ctx ) => {
    let text = ctx.update.message.text
    let tmp = text.split( " " )

    let entry = new Entry(
        {
            text: "", 
        }
    )

    // Start to explore the command on key 1 because the key 0 it's the command
    for (let i = 1; i < tmp.length; i++) {
        const elm = tmp[i]

        if ( elm == undefined ) {
            continue
        }

        // hastag
        // if ( elm.includes( "#" ) ) {
        //     entry.tags = elm
        //     continue
        // }

        if ( entry.text == "" ) {
            entry.text = elm
        }
    }

    entry.save( err => {
        if ( err ) {
            return next( err )
        }
        ctx.reply( "Hum.. Okay it's done" )
    })
}