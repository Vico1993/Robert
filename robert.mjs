import { add, get } from "./comand"
import Telegraf from 'telegraf'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

// load environement variables from .env file
dotenv.config()

// Setup URL to connect to the database
const url = `mongodb://localhost/${process.env.MONGO_INITDB_DATABASE}`
mongoose.connect( url, {useNewUrlParser: true} )

// Make the actual connection
const db = mongoose.connection

// Setup a warning if an error has been made.
db.on( 'error', console.error.bind( console, 'Error with the connection with the MongoDB:' ) )

// Create the Bot with the HTTP TOKEN API
const bot = new Telegraf( process.env.BOT_TOKEN )

bot.start((ctx) => { ctx.reply( `Hello ${ctx.from.first_name}, What I can do for you today?` ) })

// Add/Store something
bot.command( "add", add )

// Return all element in the database
bot.command( "get", get )

bot.startPolling()