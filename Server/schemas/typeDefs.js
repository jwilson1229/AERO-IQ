"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeDefs = `
type User {
    _id: ID!
    username: String!
    email: String!
}

type BetSlip {
  _id: ID!
  betType: String!
  stake: Float!
  straightBetTitle: String
  payout: Float!
  odds: Float
  createdAt: String!
  user: User!
}

input BetSlipInput {
  betType: String!
  stake: Float!
  straightBetTitle: String
  payout: Float!
  odds: Float
}


type Auth {
    token: String!
    user: User!
}

type Query {
    me: User
    getAllBetSlips: [BetSlip]
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createBetSlip(
    betType: String!
    stake: Float!
    straightBetTitle: String
    payout: Float!
    odds: Float
  ): BetSlip
}
 `;
exports.default = typeDefs;
