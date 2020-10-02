const {
    GraphQLSchema,
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
} = require('graphql');
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
    }),
});

// SpaceX Launches
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: {
            type: GraphQLInt
        },
        mission_name: {
            type: GraphQLString
        },
        launch_year: {
            type: GraphQLString
        },
        launch_date_local: {
            type: GraphQLString
        },
        launch_success: {
            type: GraphQLBoolean
        },
        rocket: {
            type: RocketType
        },
    }),
});

// SpaceX Rockets
const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: {
            type: GraphQLString
        },
        rocket_name: {
            type: GraphQLString
        },
        rocket_type: {
            type: GraphQLString
        },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        history: {
            type: new GraphQLList(HistoryEvent),
            resolve(parent, args) {
                return axios
                    .get('https://api.spacexdata.com/v4/history')
                    .then((res) => res.data);
            },
        },
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parents, args) {
                return axios
                    .get('https://api.spacexdata.com/v3/launches')
                    .then(res => res.data);
            },
        },
        launch: {
            type: LaunchType,
            args: {
                flight_number: {
                    type: GraphQLInt
                },
            },
            resolve(parent, args) {
                return axios
                    .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                    .then(res => res.data);
            },
        },
        rockets: {
            type: new GraphQLList(RocketType),
            resolve(parent, args) {
                return axios
                    .get('https://api.spacexdata.com/v3/rockets')
                    .then(res => res.data);
            },
        },
        rocket: {
            type: RocketType,
            args: {
                id: {
                    type: GraphQLInt
                },
            },
            resolve(parent, args) {
                return axios
                    .get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
                    .then(res => res.data);
            }
        }
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
