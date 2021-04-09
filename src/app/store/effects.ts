import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {Apollo, gql} from 'apollo-angular';

import { QueryWrapperResponse, SearchResponse, UsersData } from '../shared/types/user';
import * as rootActions from './actions';
import { DocumentNode } from 'graphql';
import { GoToPageToken } from '../shared/types/shared';

const TOTAL_NUMBER_PER_PAGE = 10;
@Injectable()
export class Effects {
  searchUsers$ = createEffect(() => 
    this.actions$.pipe(
      ofType(rootActions.searchUsers),
      switchMap((action) => {
        return this.apollo
        .watchQuery({
          query: this.setQuery(action.username, TOTAL_NUMBER_PER_PAGE, action.goToPageToken)
        })
        .valueChanges.pipe(
          map((response: QueryWrapperResponse) => {
            const usersData = this.extractUserData(response.data);
            console.log(response, usersData)
            return rootActions.saveUsers({usersData});
          }),
          catchError((err: HttpErrorResponse) => {
            const errorMessage = err.message;
            // This error will be handled in a real app
            console.log(errorMessage)
            return of(rootActions.setErrorMessage({errorMessage}));
          })
        )
      })
    )
  )

  extractUserData(data: SearchResponse): UsersData {
    return {
      users: data.search.nodes,
      totalCount: data.search.userCount,
      startCursorToken: data.search.pageInfo.startCursor,
      endCursorToken: data.search.pageInfo.endCursor
    }
  }

  setQuery(query: string, first: number, goToPageToken?: GoToPageToken): DocumentNode {
    return gql`
      {
        search(${this.getQueryArgs(query, first, goToPageToken)}) {
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
          userCount,
          pageInfo {
            startCursor,
            endCursor
          }
        }
      }
    `
  }

  getQueryArgs(query: string, first: number, goToPageToken: GoToPageToken): string {
    let queryArgs = `query:"${query} type:user", type: USER, `;
    console.log({goToPageToken})
    switch (goToPageToken?.type) {
      case 'next':
        queryArgs = queryArgs + `first: ${first}, after: "${goToPageToken.value}"`
        break
      case 'previous':
        queryArgs = queryArgs + `last: ${first}, before: "${goToPageToken.value}"`
        break
      default:
        queryArgs = queryArgs + `first: ${first},`;
        break;
    }
    console.log({queryArgs})
    return queryArgs;
  }

  constructor(private actions$: Actions, private http: HttpClient, private apollo: Apollo) {}


}
