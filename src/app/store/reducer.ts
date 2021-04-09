import { Action, createReducer, on } from "@ngrx/store";
import { UsersData } from "../shared/types/user";
import * as actions from "./actions";

const initialState: UsersData = {
  totalCount: 0,
  users: []
};

const _reducer = createReducer(initialState,
  on(
    actions.saveUsers,
    (state, action) => ({
      ...state,
      totalCount: action.usersData.totalCount,
      users: action.usersData.users
    })
  )
)

export function reducer(state: UsersData, action: Action) {
  return _reducer(state, action);
}
