import { Expense } from "../model/Expense"

/**
 * Get Command
 *
 * @param {Context} ctx Telegraf Context of the Message
 */
export const get = async ( ctx:any ) => {
    const message = ctx.update.message
    const tmp = message.text.split( " " )

    // tmp[ 1 ] should be `today` | `all` | `week`
    if ( typeof tmp[ 1 ] === "string" ) {
        let sum = 0
        if ( tmp[ 1 ] == "today" ) {
            let exps = await Expense.getAllExpenseForToday()

            if ( exps.length > 0 ) {
                sum = exps.reduce((a, b) => a + Number( b._amount ), 0)
            }
            ctx.reply( `Today you spend : ${sum} $` )
            return

        } else if ( tmp[ 1 ] == "all" ) {
            let exps = await Expense.GetAllExpense()

            if ( exps.length > 0 ) {
                sum = exps.reduce((a, b) => a + Number( b._amount ), 0)
            }

            ctx.reply( `in total you spend : ${sum} $` )
            return
        } else if ( tmp[ 1 ] == "week" ) {
            let exps = await Expense.getAllExpenseForTheWeek()

            if ( exps.length > 0 ) {
                sum = exps.reduce((a, b) => a + Number( b._amount ), 0)
            }

            ctx.reply( `this week you spend : ${sum} $` )
            return
        } else {
            ctx.reply( `Hum... I'm sorry... but what is this ${tmp[ 1 ]}` )
            return
        }
    }

    ctx.reply( `Hum... Something goes wrong with your comand format...` )
    return
}