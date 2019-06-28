import { Timestamp, CollectionReference } from "@google-cloud/firestore";
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
     * Return an Array of expenses store in the database
     *
     * @param tag tag we want to check
     */
    // static async GetExpenseByTag( tag:string ): Array<Expense> {
    //     let expenses = await db.collection( "Expenses" ).where( tag )
    // }

    /**
     * Get all Expenses
     */
    static async GetAllExpense(): Promise<Expense[]> {
        let exps: Expense[] = []
        const expenses = await Expense._db.get()

        expenses.forEach( exp => {
            // console.log ( exp.data )
            exps.push( new Expense( exp.data().amount, exp.data().devise, exp.data().date ) )
        })

        return exps
    }

    /**
     * Return the list of expenses for today
     */
    static async getAllExpenseForToday(): Promise<Expense[]> {
        let exps: Expense[] = []
        const expenses = await Expense._db.get() // where( 'date', '>=',  ).get()

        expenses.forEach( exp => {
            // console.log ( exp.data )
            exps.push( new Expense( exp.data().amount, exp.data().devise, exp.data().date ) )
        })

        return exps
    }
}