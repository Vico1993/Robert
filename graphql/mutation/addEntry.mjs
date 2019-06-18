import { GraphQLNonNull, GraphQLString } from 'graphql'

import entryType from './../types/entryType'
import entry from './../../model/entry'

exports.addEntry = {
    type: entryType.entryType,
    args: {
        text: {
            type: new GraphQLNonNull( GraphQLString )
        }
    },
    resolve: async ( root, args ) => {
        const uModel = new entry( args )
        const newEntry = uModel.save()

        if ( !newEntry ) {
            throw new Error( 'Error happened when try the save the new entry' )
        }

        return newEntry
    }
}