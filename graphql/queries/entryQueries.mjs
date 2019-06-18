import { GraphQLObjectType, GraphQLList } from 'graphql'

import entryType from './../types/entryType'
import entry from './../../model/entry'

exports.entryQueries = new GraphQLObjectType({
    name: 'Query',
    fiedls: () => {
        return {
            entry: {
                type: GraphQLList( entryType.entryType ),
                resolve: async () => {
                    const entries = await entry.find()

                    if ( !entries ) {
                        throw new Error( 'Error while fetching Entry' )
                    }

                    return entries
                }
            }
        }
    }
})