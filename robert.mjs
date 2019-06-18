import { add } from "./comand.mjs"
import Telegraf from 'telegraf'
import dotenv from 'dotenv'

// load environement variables from .env file
dotenv.config()

// Create the Bot with the HTTP TOKEN API
const bot = new Telegraf( process.env.BOT_TOKEN )

bot.start((ctx) => { ctx.reply( `Hello ${ctx.from.first_name}, What I can do for you today?` ) })

// Add/Store something
bot.command( "add", add )

bot.startPolling()