const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');
const axios = require('axios');

// SpaceX Historic Events
const HistoryEvent = new GraphQLObjectType({
    name: 'History',
    fields: () => ({
        title: {
            type: GraphQLString,
        },
        event_date_utc: {
            type: GraphQLString,
        },
        event_date_unix: {
            type: GraphQLInt,
        },
        details: {
            type: GraphQLString,
        },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        history: {
            type: new GraphQLList(HistoryEvent),
            resolve(parent, args) {
                return axios.get('https://api.spacexdata.com/v4/history')
                    .then(res => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});