import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql'

exports.entryType = new GraphQLObjectType({
    name: 'entry',
    fields: () => {
        return {
            id: {
                type: GraphQLNonNull(GraphQLID), 
                text: {
                    type: GraphQLString
                }
            }
        }
    }
})