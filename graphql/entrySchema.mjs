import { GraphQLSchema, GraphQLObjectType } from 'graphql'

import {entryQueries as query} from './queries/entryQueries'
import {entryMutations as mutation} from './mutation/entryMutations'

exports.entrySchema = new GraphQLSchema({
    query: query,
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: mutation
    })
})