import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as rootActions from '../store/actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private store: Store) { }

  getUser(username: string) {
    console.log(username);
    this.store.dispatch(rootActions.searchUsers({username}));
  }
}
