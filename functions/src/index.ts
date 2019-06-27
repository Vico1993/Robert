import * as functions from 'firebase-functions';
import robert from './service/robert'

/**
 * WebHook for the Telegram Bot.
 */
export const robhook = functions.https.onRequest( (req, res) => {
    return robert.handleUpdate( req.body, res ).then( () => {    
        res.end()
    })
})