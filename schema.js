const { gql } = require('@apollo/server');
// Définir le schéma GraphQL
const typeDefs = `
  type User {
    id: String!
    username: String!
    email: String!
    password: String!
  }

  type Query {
    user(id: String!): User
    users: [User]
  }
`;
module.exports = typeDefs