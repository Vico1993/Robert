import { GraphQLNonNull, GraphQLString } from 'graphql'

import entryType from './../types/entryType'
import entry from './../../model/entry'

exports.updateEntry = {
    type: entryType.entryType,
    args: {
        id: {
            type: new GraphQLNonNull( GraphQLString )
        },
        name: {
            type: new GraphQLNonNull( GraphQLString ),
        },
    },
    resolve: async ( root, args ) => {
        const updateEntry = await entry.findByIdAndUpdate( args.id, args )

        if ( !updateEntry ) {
            throw new Error( 'Error happened when try to update an entry' )
        }

        return updateEntry
    }
}