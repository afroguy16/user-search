import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {Apollo, gql} from 'apollo-angular';

import { QueryWrapperResponse, SearchResponse, UsersData } from '../shared/types/user';
import * as rootActions from './actions';
import { DocumentNode } from 'graphql';
import { GoToPageData } from '../shared/types/shared';
import { AlertConfig } from '../shared/types/alert';
import { AlertService } from '../shared/services/alert.service';
import { AlertEnums } from '../shared/enums/alert';

const TOTAL_NUMBER_PER_PAGE = 12;
@Injectable()
export class Effects {
  searchUsers$ = createEffect(() => 
    this.actions$.pipe(
      ofType(rootActions.searchUsers),
      switchMap((action) => {
        return this.apollo
        .watchQuery({
          query: this.setQuery(action.username, TOTAL_NUMBER_PER_PAGE, action.goToPageData)
        })
        .valueChanges.pipe(
          map((response: QueryWrapperResponse) => {
            const usersData = this.extractUserData(response.data);
            return rootActions.saveUsers({usersData});
          }),
          catchError(() => {
            const errorMessage = 'Something went wrong, refresh the app then start searching again.';
            // This error will be be used for each case, but here, I am discarding the error, and hard coding a value
            this.showError({type: AlertEnums.DANGER, message: errorMessage})
            return of(rootActions.setErrorMessage({errorMessage}));
          })
        )
      })
    )
  )

  constructor(private actions$: Actions, private apollo: Apollo, private alertService: AlertService) {}

  // Ideally these functions and query can be moved out the effects file so the code is not clogged

  private extractUserData(data: SearchResponse): Partial<UsersData> {
    return {
      users: data.search.nodes,
      totalCount: data.search.userCount,
      pageInfo: {
        hasNextPage: data.search.pageInfo.hasNextPage,
        hasPreviousPage: data.search.pageInfo.hasPreviousPage,
        startCursor: data.search.pageInfo.startCursor,
        endCursor: data.search.pageInfo.endCursor,
      }
    }
  }

  private setQuery(query: string, first: number, goToPageData?: GoToPageData): DocumentNode {
    return gql`
      {
        search(${this.getQueryArgs(query, first, goToPageData)}) {
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
              url
            }
          }
          userCount,
          pageInfo {
            startCursor,
            endCursor,
            hasPreviousPage,
            hasNextPage
          }
        }
      }
    `
  }

  private getQueryArgs(query: string, first: number, goToPageData: GoToPageData): string {
    let queryArgs = `query:"${query} type:user", type: USER, `;
    switch (goToPageData?.type) {
      case 'next':
        queryArgs = queryArgs + `first: ${first}, after: "${goToPageData.value}"`
        break
      case 'previous':
        queryArgs = queryArgs + `last: ${first}, before: "${goToPageData.value}"`
        break
      default:
        queryArgs = queryArgs + `first: ${first},`;
        break;
    }
    return queryArgs;
  }

  showError(config: AlertConfig): void {
    this.alertService.open(config);
  }
}
