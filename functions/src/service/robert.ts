// import { add, get } from "./comand"
import { add } from "./comand/add"
import Telegraf from 'telegraf'
import { config } from 'dotenv'

// load environement variables from .env file
config()

if ( typeof process.env.TELEGRAM_BOT_TOKEN === undefined ) {
    throw new Error( "Variable TELEGRAM_BOT_TOKEN not found in your environement variable, please set this variable" );
}

// Create the Bot with the HTTP TOKEN API
const robert = new Telegraf( process.env.TELEGRAM_BOT_TOKEN || "" )

robert.start((ctx:any) => { ctx.reply( `Hello ${ctx.from.first_name}, What I can do for you today?` ) })

// Add/Store something
robert.command( "add", add )

// // Return all element in the database
// bot.command( "get", get )

export default robert