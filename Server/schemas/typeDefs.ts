
const typeDefs =`
type User {
    _id: ID!
    username: String!
    email: String!
    BetSlips: [BetSlip]!
}

input ParlayLegInput {
    title: String!
    odds: Float!
}

type ParlayLeg {
    title: String!
    odds: Float!
}

type BetSlip {
  _id: ID
  betType: String!
  stake: Float!
  straightBetTitle: String
  payout: Float!
  odds: Float!
  Parlaylegs: [ParlayLeg]
  createdAt: String
}

input CreateBetSlipInput {
    betType: String!
    stake: Float!
    straightBetTitle: String
    payout: Float
    odds: Float
    Parlaylegs: [ParlayLegInput]

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
    createBetSlip(input: CreateBetSlipInput!): BetSlip!
}
 `;

    export default typeDefs
