import { Expense } from "../model/Expense"

/**
 * Get Command
 *
 * @param {Context} ctx Telegraf Context of the Message
 */
export const get = async ( ctx:any ) => {
    const message = ctx.update.message
    const tmp = message.text.split( " " )

    // Get the date from the message
    const date = new Date( message.date * 1000 )

    if ( date.getHours() < 4 ) {
        date.setDate( date.getDate() - 1 )
    }

    // tmp[ 1 ] should be `today` | `week`
    let sum = 0
    if ( tmp[ 1 ] === "today" ) {
        const exps = await Expense.getAllExpenseForToday( date )

        if ( exps.length > 0 ) {
            sum = exps.reduce((a, b) => a + Number( b._amount ), 0)
        }

        ctx.reply( `Today you spend : ${sum.toFixed(2)} $` )
        return

    } else if ( tmp[ 1 ] === "week" ) {
        const exps = await Expense.getAllExpenseForTheWeek( date )

        if ( exps.length > 0 ) {
            sum = exps.reduce((a, b) => a + Number( b._amount ), 0)
        }

        ctx.reply( `this week you spend : ${sum.toFixed(2)} $` )
        return
    } else {
        const exps = await Expense.GetAllExpense()

        if ( exps.length > 0 ) {
            sum = exps.reduce((a, b) => a + Number( b._amount ), 0)
        }

        ctx.reply( `in total you spend : ${sum.toFixed(2)} $` )
        return
    }
}