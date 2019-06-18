import { GraphQLNonNull, GraphQLString } from 'graphql'

import entryType from './../types/entryType'
import entry from './../../model/entry'

exports.deleteEntry = {
    type: entryType.entryType,
    args: {
        id: {
            type: new GraphQLNonNull( GraphQLString )
        }
    },
    resolve: ( root, args ) => {
        const deleteEntry = await entry.findByIdAndRemove( args.id )

        if (!deleteEntry) {
            throw new Error( 'Error trying to remove an Id' )
        }

        return deleteEntry;
    }
}