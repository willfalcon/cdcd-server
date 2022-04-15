import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    sites: [Site!]!
    postTypeOptions(id: ID!): [PostTypeOption!]!
  }
  type Mutation {
    createSite(title: String!, url: String!, frontendUrl: String): Site!
    updateSite(id: ID!, data: SiteFields!): Site!
    deleteSite(id: ID!): Boolean
  }

  type PostTypeOption {
    type: String!
  }

  input SiteFields {
    title: String
    url: String
    frontendUrl: String
    flagTime: Int
  }
  type Site {
    id: ID!
    title: String!
    url: String!
    frontendUrl: String
    latestPost: String
    latestUpdate: String
    flagTime: Int
    error: String
    postTypes: [PostTypeOption]
  }
`;
