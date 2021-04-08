import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
        return this.http.get<UsersResponse>(environment.searchURL + action.username)
        .pipe(
          map((usersResponse: UsersResponse) => {
            console.log({usersResponse});
            return rootActions.saveUsers({usersResponse});
          }),
          catchError((err: HttpErrorResponse) => {
            const errorMessage = err.message;
            console.log({errorMessage});
            return of(rootActions.setErrorMessage({errorMessage}));
          })
        )
      })
    )
  )

  constructor(private actions$: Actions, private http: HttpClient) {}
}
