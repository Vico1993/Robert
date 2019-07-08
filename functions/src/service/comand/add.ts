import { Expense } from "../model/Expense";
import { Context } from "telegraf"
/**
 * Add Command
 *
 * @param {Context} ctx Telegraf Context of the Message
 */
export const add = ( ctx:Context ) => {
    const message = ctx.update.message
    // const tmp = message.text.split( " " )

    console.log( message )

    const tagRegex = new RegExp( /#[a-zA-Z]*/ )
    // const deviseRegex = new RegExp( /CAD|USD|EUR/i )

    // const tagMatched = message.match( tagRegex )

    // console.log( tagMatched  )

    // const expense = new Expense( tmp[ 1 ], tmp[ 2 ] || "CAD" )

    // return expense.Save().then( async () => {
    //     // When the document is save
    //     // Check the new sum of the day and return the result
    //     let sum = 0
    //     const exps = await Expense.getAllExpenseForToday()

    //     if ( exps.length > 0 ) {
    //         sum = exps.reduce((a, b) => a + Number( b._amount ), 0)
    //     }

    //     ctx.reply( `It's done! Today you spend : ${sum.toFixed(2)} $` )
    //     return
    // })
    // .catch( error => {
    //     console.error( "Somenthing happens, when I tried to add some an expense :", error )
    //     ctx.reply( "Sorry.. Something happens in my system.. can't add this expense.. Check the syntax FIRST." )
    // })
}