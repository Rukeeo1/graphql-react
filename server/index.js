const { ApolloServer } = require('apollo-server');

require('dotenv').config();

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const vehicleAPI = require('./datasources/vehicles');
const userAPI = require('./dataSources/user');
const { getUser } = require('./verify');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.get('Authorization') || '';

    return {
      user: getUser(token.replace('Bearer ', ''), process.env.JWT_SECRET),
    };
  },
  dataSources: () => ({
    vehicleAPI: new vehicleAPI(),
    userAPI: new userAPI(),
  }),
});

server.listen().then(() => {
  console.log(`
    Server is running!
    Listening on port 4000
    Explore at https://studio.apollographql.com/dev
  `);
});
