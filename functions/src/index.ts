import * as functions from 'firebase-functions';
import { Expense } from './service/model/Expense'
import robert from './service/robert'

/**
 * WebHook for the Telegram Bot.
 */
export const robhook = functions.https.onRequest( (req, res) => {
	return robert.handleUpdate( req.body, res ).then( () => {
		res.end()
	})
})

exports.createUser = functions.firestore
	.document('Test/{expenseId}').onCreate( async ( snap, context ) => {
		let sum = 0
		const exps = await Expense.getAllExpenseForToday()

        if ( exps.length > 0 ) {
            sum = exps.reduce((a, b) => a + Number( b._amount ), 0)
        }

		if ( sum >= 80 ) {
			let warningMessage = "Warning! You are close to your limit"

			if ( sum >= 100 ) {
				warningMessage = `Warning! You exceeded your limit from ${sum - 100}`
			}

			try {
				await robert.telegram.sendMessage( process.env.TELEGRAM_CHAT_ID || "", warningMessage )
			} catch (error) {
				console.error( `error in the warning ${error}` )
			}
		}
	});