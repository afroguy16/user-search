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
