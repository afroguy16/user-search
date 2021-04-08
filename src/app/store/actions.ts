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

// This action can be used to send feedback to the component
export const setErrorMessage = createAction(
  '[Users] setErrorMessage',
  props<{
    errorMessage: string
  }>()
);
