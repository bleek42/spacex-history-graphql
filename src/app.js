const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const helmet = require('helmet');

const schema = require('./schema');

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

module.exports = app;