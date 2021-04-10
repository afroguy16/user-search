import { Action, createReducer, on } from "@ngrx/store";
import { UsersData } from "../shared/types/user";
import * as actions from "./actions";

const initialState: UsersData = {
  username: '',
  totalCount: 0,
  users: [],
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: '',
    endCursor: ''
  }
};

const _reducer = createReducer(initialState,
  on(
    actions.searchUsers,
    (state, action) => ({
      ...state,
      username: action.username,
    })
  ),

  on(
    actions.saveUsers,
    (state, action) => ({
      ...state,
      totalCount: action.usersData.totalCount,
      users: action.usersData.users,
      pageInfo: {
        ...state.pageInfo,
        hasPreviousPage: action.usersData.pageInfo.hasPreviousPage,
        hasNextPage: action.usersData.pageInfo.hasNextPage,
        startCursor: action.usersData.pageInfo.startCursor,
        endCursor: action.usersData.pageInfo.endCursor
       }
    })
  )
)

export function reducer(state: UsersData, action: Action) {
  return _reducer(state, action);
}
