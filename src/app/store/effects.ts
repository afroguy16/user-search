import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UsersResponse } from '../shared/types/user';
import * as rootActions from './actions';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';

@Injectable()
export class Effects {
  searchUsers$ = createEffect(() => 
    this.actions$.pipe(
      ofType(rootActions.searchUsers),
      switchMap((action) => {
        return this.http.get<UsersResponse>(environment.searchURL + action.username);
      })
    ).pipe(
        map((usersResponse: UsersResponse) => {
          console.log({usersResponse});
          return rootActions.saveUsers({usersResponse});
        }),
        catchError(error => {
          // An action like this can be created to handle errors
          console.log({error})
          return of({type: 'ERROR', payload: error});
        })
      )
  )

  // @Effect()
  // searchUsers$ = this.actions$.pipe(
  //   ofType(rootActions.SEARCH_USERS),
  //   switchMap((searchData: rootActions.SearchUsers) => {
  //     console.log('triggered!!!')
  //     return this.http.get<UsersResponse>(environment.searchURL + searchData.payload);
  //   })
  // ).pipe(
  //     map((usersResponse: UsersResponse) => {
  //       console.log(usersResponse);
  //       return of(new rootActions.SaveUsers(usersResponse));
  //     }),
  //     catchError(error => {
  //       console.log(error);
  //       return of({type: 'ERROR'});
  //     })
  //   )

  constructor(private actions$: Actions, private http: HttpClient) {}
}
