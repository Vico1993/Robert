import {Entry} from './../model'

/**
 * Get Command
 *
 * @param {Context} ctx Telegraf Context of the Message
 */
export const get = ctx => {
    Entry.
        find().
        populate( 'tags' ).
        exec(function ( err, entries ) {
            if (err) return handleError(err);

            if ( entries.length ) {
                ctx.reply( "You register few entries" )
                for ( const entry of entries ) {
                    let tags = ""
                    if ( entry.tags.length ) {
                        tags = entry.tags.map( tag => {
                            return tag.tag
                        }).join( " " )
                    }

                    ctx.reply( `${entry.text} ( ${tags} )` )
                }
            } else {
                ctx.reply( "No entries... plz use the Add comand" )
            }
        });
}