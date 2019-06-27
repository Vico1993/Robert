import { Timestamp } from "@google-cloud/firestore";
import { db } from './config'

export class Expense {
    _amount: number
    _devise: string
    _date: Timestamp

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
        return db.collection( "Expenses" ).add({
            amount: this._amount,
            date: this._date,
            devise: this._devise,
        })
    }

}