import { Expense } from "../model/Expense";

/**
 * Add Command
 *
 * @param {Context} ctx Telegraf Context of the Message
 */
export const add = ( ctx:any ) => {
    const message = ctx.update.message
    const tmp = message.text.split( " " )

    const expense = new Expense( tmp[ 1 ], tmp[ 2 ] || "CAD" )

    return expense.Save().then( () => {
        ctx.reply( "Hum.. Okay it's done" )
    })
    .catch( error => {
        console.error( "Somenthing happens, when I tried to add some an expense :", error )
        ctx.reply( "Sorry.. Something happens in my system.. can't add this expense.. Check this syntax" )
    })
}