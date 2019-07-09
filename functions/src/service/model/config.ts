/**
* Will initialize the connection with the database|Firestore Collection
*/

import * as admin from 'firebase-admin'
import * as test from '@firebase/testing'

// @todo: remove the databaseURL into a config file? env file? Maybe you can call the firebase project config file
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://robert-4b7cf.firebaseio.com"
})

test.initializeTestApp({
    projectId: 'robert-4b7cf',
})

/**
 * Initialize the Firestore DB
 */
export const db = admin.firestore()