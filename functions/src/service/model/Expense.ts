import { Timestamp, CollectionReference, QuerySnapshot } from "@google-cloud/firestore"
import { db } from './config'

export class Expense {
    _amount: number
    _devise: string
    _date: Timestamp

    static _db: CollectionReference = db.collection( "Expenses" )

    constructor( amount:number, devise = "CAD", date:Timestamp = Timestamp.now() ) {
        this._amount = amount
        this._devise = devise
        this._date = date
    }

    /**
     * Save is a method who will save the Expense object into the Firestore collection
     *
     * @returns {Promise}
     */
    Save (): Promise<any> {
        return Expense._db.add({
            amount: this._amount,
            date: this._date,
            devise: this._devise,
        })
    }

    /**
     * Format the expense Object to a text message format
     *
     * @returns {string}
     */
    toString (): string {
        const d = this._date.toDate()
        const dateFormat = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes()
        return `${dateFormat}: ${this._amount} CAD`
    }

    /**
     * Method who will translate the result from the Firestore into an array of Expense object
     * Return devices in CAD for an easy count ( FOR NOW )
     *
     * @param data Result from the Firestore
     * @return {Expense[]}
     */
    protected static Load( data: QuerySnapshot ): Expense[] {
        const exps: Expense[] = []
        data.forEach( exp => {
            let amount = exp.data().amount

            if ( exp.data().devise === "USD" ) {
                amount = exp.data().amount * 1.31
            } else if ( exp.data().devise === "EUR" ) {
                amount = exp.data().amount * 1.49
            }

            exps.push( new Expense( amount, "CAD", exp.data().date ) )
        })

        return exps
    }

    /**
     * Get all Expenses save in the firestore
     *
     * @returns {Promise}
     */
    static async GetAllExpense(): Promise<Expense[]> {
        const expenses = await Expense._db.get()

        return this.Load( expenses )
    }

    /**
     * Return the list of expenses for today
     *
     * @returns {Promise}
     */
    static async getAllExpenseForToday(): Promise<Expense[]> {
        // Get date for today first seconde
        const today = new Date()
        today.setDate( today.getDate() - 1 )
        today.setHours( 17, 0, 0, 0 )

        const expenses = await Expense._db.where( 'date', '>=', Timestamp.fromDate( today ) ).get()

        return this.Load( expenses )
    }

    /**
     * Return the list of expenses for the Week
     *
     * @todo: Right know need to be execute in sunday.. if it's run on Monday... will return the same result as `getAllExpenseForToday`
     * @returns {Promise}
     */
    static async getAllExpenseForTheWeek(): Promise<Expense[]> {
        // Get date for today first seconde
        const today = new Date()
        const day = today.getDay() || 7
        if ( day !== 1 ) {
            today.setHours( -24 * ( day - 1 ) )
        }

        const expenses = await Expense._db.where( 'date', '>=', Timestamp.fromDate( today ) ).get()

        return this.Load( expenses )
    }
}