export type Countable = {
  totalCount: number
}

export interface GitHubResponse {
  loading: boolean,
  networkStatus: number
}

export interface GoToPageData {
  type: string,
  value: string
}

export interface PageInfo {
  startCursor: string,
  endCursor: string,
  hasPreviousPage: boolean,
  hasNextPage: boolean,
}
