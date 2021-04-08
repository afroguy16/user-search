import { Action, createReducer, on } from "@ngrx/store";
import { UsersResponse } from "../shared/types/user";
import * as actions from "./actions";

const initialState: UsersResponse = {
  total_count: 0,
  incomplete_results: false,
  items: []
};

const _reducer = createReducer(initialState,
  on(
    actions.saveUsers,
    (state, action) => ({
      ...state,
      total_count: action.usersResponse.total_count,
      incomplete_result: action.usersResponse.incomplete_results,
      items: action.usersResponse.items
    })
  )
)

export function reducer(state: UsersResponse, action: Action) {
  return _reducer(state, action);
}
