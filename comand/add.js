/**
 * Databases of entries
 *
 * @todo: Please add a database...
 */
let entries = []

/**
 * Class Entry
 *
 * Will store / save all element the bot need to keep in mind
 */
class Entry {
    constructor( text = "", tags = [] ) {    
        this._text = text
        this._tags = tags
    }

    /**
     * @param {string} text
     */
    set text( text ) {
        this._text = text
    }
    
    /**
     * Return the text property
     */
    get text() {
        return this._text
    }

    /**
     * @param {string} tags
     */
    set tags( tags ) {
        this._tags.push( tags )
    }

    /**
     * Save this entry in the database
     */
    save() {
        if ( this._text == "" ) {
            console.error( "Can't saved an empty entry.. make no sense" )
            return;
        }

        // Push the object
        entries.push( this )
    }
}

/**
 * Add Command
 *
 * @param {Context} ctx Telegraf Context of the Message
 */
export const add = ( ctx ) => {
    let text = ctx.update.message.text
    let tmp = text.split( " " )

    let entry = new Entry()

    // Start to explore the command on key 1 because the key 0 it's the command
    for (let i = 1; i < tmp.length; i++) {
        const elm = tmp[i]

        if ( elm == undefined ) {
            continue
        }

        // hastag
        if ( elm.includes( "#" ) ) {
            entry.tags = elm
            continue
        }

        if ( entry.text == "" ) {
            entry.text = elm
        }
    }

    entry.save()

    ctx.reply( "Hum.. Okay I'm saving your information" )
}