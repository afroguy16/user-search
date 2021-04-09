import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GoToPageToken } from '../shared/types/shared';
import * as rootActions from '../store/actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private store: Store) { }

  getUser(username: string, goToPageToken?: GoToPageToken) {
    this.store.dispatch(rootActions.searchUsers({username, goToPageToken}));
  }
}
