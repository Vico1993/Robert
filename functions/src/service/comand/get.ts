import { Expense } from "../model/Expense";

/**
 * Get Command
 *
 * @param {Context} ctx Telegraf Context of the Message
 */
export const get = ( ctx:any ) => {
    const message = ctx.update.message
    const tmp = message.text.split( " " )

    // tmp[ 1 ] should be `today` | `all` | `week`
    if ( typeof tmp[ 1 ] === "string" ) {
        if ( tmp[ 1 ] == "today" ) {
            return Expense.GetAllExpense().then( exps => {
                ctx.reply( `This is every expense I found for the day` )

                exps.forEach( exp => {
                    ctx.reply( exp.toString() )
                })
            }).catch( error => {
                ctx.reply( `Sorry... something go wrongs for the day.. ${error}` )
            })
        } else if ( tmp[ 1 ] == "all" ) {
            return Expense.GetAllExpense().then( exps => {
                ctx.reply( `This is every expense I found` )

                exps.forEach( exp => {
                    ctx.reply( exp.toString() )
                })
            }).catch( error => {
                ctx.reply( `Sorry... something go wrongs for all expenses.. ${error}` )
            })
        } else if ( tmp[ 1 ] == "week" ) {
            return Expense.getAllExpenseForTheWeek().then( exps => {
                ctx.reply( `This is what I found for this week` )

                exps.forEach( exp => {
                    ctx.reply( exp.toString() )
                })
            }).catch( error => {
                ctx.reply( `Sorry... something go wrongs for the week.. ${error}` )
            })
        } else {
            ctx.reply( `Hum... I'm sorry... but what is this ${tmp[ 1 ]}` )
            return;
        }
    }

    ctx.reply( `Hum... Something goes wrong with your comand format...` )
    return;
}