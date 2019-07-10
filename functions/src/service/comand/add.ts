import { Expense } from "../model/Expense";

/**
 * Add Command
 *
 * @param {Context} ctx Telegraf Context of the Message
 */
export const add = ( ctx:any ) => {
    const message = ctx.update.message
    const tmp = message.text.split( " " )

    if ( typeof tmp[ 1 ] !== "number" ) {
        ctx.reply( `This is Not A Number ${tmp[ 1 ]}` )
        return
    }

    const expense = new Expense( tmp[ 1 ], tmp[ 2 ] || "CAD" )

    return expense.Save().then( async () => {
        // When the document is save
        // Check the new sum of the day and return the result
        let sum = 0
        const exps = await Expense.getAllExpenseForToday()

        if ( exps.length > 0 ) {
            sum = exps.reduce((a, b) => a + Number( b._amount ), 0)
        }

        ctx.reply( `It's done! Today you spend : ${sum.toFixed(2)} $` )
        return
    })
    .catch( error => {
        console.error( "Somenthing happens, when I tried to add some an expense :", error )
        ctx.reply( "Sorry.. Something happens in my system.. can't add this expense.. Check the syntax FIRST." )
    })
}