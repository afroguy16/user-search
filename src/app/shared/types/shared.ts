export type Countable = {
  totalCount: number
}

export interface GitHubResponse {
  loading: boolean,
  networkStatus: number
}

export interface GoToPageToken {
  type: string,
  value: string
}
