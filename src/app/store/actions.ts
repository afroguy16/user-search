import { createAction, props } from "@ngrx/store";
import { UsersResponse } from "../shared/types/user";
 
export const searchUsers = createAction(
  '[Users] Search Users',
  props<{username: string}>()
);

export const saveUsers = createAction(
  '[Users] Save Users',
  props<{usersResponse: UsersResponse}>()
);

export const authenticateFail = createAction(
  '[Auth] Authenticate Fail',
  props<{
    errorMessage: string
  }>()
);
