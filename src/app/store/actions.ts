import { createAction, props } from "@ngrx/store";
import { UsersData } from "../shared/types/user";
 
export const searchUsers = createAction(
  '[Users] Search Users',
  props<{username: string, pageNumber?: number}>()
);

export const saveUsers = createAction(
  '[Users] Save Users',
  props<{usersData: UsersData}>()
);

// This action can be used to send feedback to the component
export const setErrorMessage = createAction(
  '[Users] setErrorMessage',
  props<{
    errorMessage: string
  }>()
);
