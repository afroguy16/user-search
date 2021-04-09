import { Countable, GitHubResponse } from "./shared";
export interface QueryWrapperResponse extends GitHubResponse {
  data: SearchResponse
}
export interface SearchResponse extends GitHubResponse {
  search: UserSearchResponse
}
export interface User {
  avatarUrl: string;
  bio: string
  followers: Countable
  following: Countable
  login: string
  name: string
}

export interface PageInfo {
  startCursor: string,
  endCursor: string
}
export interface UserSearchResponse extends GitHubResponse {
  nodes: User[],
  pageInfo: PageInfo,
  userCount: number
}
export interface UsersData extends Countable {
  users: User[],
  startCursorToken: string,
  endCursorToken: string
}
