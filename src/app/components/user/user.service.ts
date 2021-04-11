import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GoToPageData } from '../../shared/types/shared';
import * as rootActions from '../../store/actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private store: Store) { }

  searchUser(username: string, goToPageData?: GoToPageData) {
    this.store.dispatch(rootActions.searchUsers({username, goToPageData}));
  }
}
