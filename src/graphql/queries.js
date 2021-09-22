/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPoll = /* GraphQL */ `
  query GetPoll($id: ID!) {
    getPoll(id: $id) {
      id
      name
      type
      candidates {
        nextToken
      }
      itemType
      createdAt
      updatedAt
    }
  }
`;
export const listPolls = /* GraphQL */ `
  query ListPolls(
    $filter: ModelPollFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPolls(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        type
        itemType
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCandidate = /* GraphQL */ `
  query GetCandidate($id: ID!) {
    getCandidate(id: $id) {
      id
      pollCandidatesId
      image
      candidateType
      name
      upvotes
      createdAt
      updatedAt
    }
  }
`;
export const listCandidates = /* GraphQL */ `
  query ListCandidates(
    $filter: ModelCandidateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCandidates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        pollCandidatesId
        image
        candidateType
        name
        upvotes
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const itemsByType = /* GraphQL */ `
  query ItemsByType(
    $itemType: String
    $candidateType: ModelStringKeyConditionInput
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPollFilterInput
    $limit: Int
    $nextToken: String
  ) {
    itemsByType(
      itemType: $itemType
      candidateType: $candidateType
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        type
        pollCandidatesId
        candidateType
        itemType
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const candidatesByName = /* GraphQL */ `
  query CandidatesByName(
    $name: String
    $candidateType: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCandidateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    candidatesByName(
      name: $name
      candidateType: $candidateType
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pollCandidatesId
        image
        candidateType
        name
        upvotes
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
