const { gql } = require('apollo-server');

const typeDefs = gql`
  # Your schema will go here

  type Vehicle {
    bike_id: String
    lat: Float
    lon: Float
    is_reserved: Int
    is_disabled: Int
    vehicle_type: String
  }

  type User {
    id: ID!
    email: String!
    password: String!
    name: String
    token: String
  }

  type Query {
    vehicles: [Vehicle]
    vehicle(id: String!): Vehicle
    searchVehicles(id: String!): [Vehicle]
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): User
    signUp(email: String!, password: String!, name: String): User
  }
`;

module.exports = typeDefs;
