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
    // return this.http.get<UsersResponse>(`https://api.github.com/search/users?q=${username}`);
    console.log(username);
    this.store.dispatch(rootActions.searchUsers({username}));
  }
}
