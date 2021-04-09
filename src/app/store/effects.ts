import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {Apollo, gql} from 'apollo-angular';

import { UsersResponse } from '../shared/types/user';
import * as rootActions from './actions';
import { environment } from '../../environments/environment';

// const query = gql`
//   {
//     viewer {
//       login
//     }
//   }
// `

const query = gql`
  {
    search(query:"example", type: USER, first: 10) {
      nodes {
        ... on User {
          avatarUrl,
          bio,
          followers {
            totalCount
          },
          following {
            totalCount
          },
          login,
          name,
        }
      }
      userCount
    }
  }
`

@Injectable()
export class Effects {
  searchUsers$ = createEffect(() => 
    this.actions$.pipe(
      ofType(rootActions.searchUsers),
      switchMap((action) => {
        // return this.http.get<UsersResponse>(environment.searchURL + action.username)
        return this.apollo
        .watchQuery({
          query,
        })
        .valueChanges.pipe(
          map((usersResponse: any) => {
            console.log({usersResponse})
            return rootActions.saveUsers({usersResponse});
          }),
          catchError((err: HttpErrorResponse) => {
            const errorMessage = err.message;
            console.log(errorMessage)
            return of(rootActions.setErrorMessage({errorMessage}));
          })
        )
      })
    )
  )

  constructor(private actions$: Actions, private http: HttpClient, private apollo: Apollo) {}
}
