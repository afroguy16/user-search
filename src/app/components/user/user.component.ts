import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UsersData } from '../../shared/types/user';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  alive = true;
  username = '';
  usersTotalCount = 0;
  itemsPerpage = 10;
  users = [];
  hasPreviousPage = false;
  hasNextPage = false;
  startCursorToken = '';
  endCursorToken = ''

  constructor(private userService: UserService, private store: Store<{users: UsersData}>) { }

  ngOnInit(): void {
    this.setUsersPageData();
  }

  setUsersPageData(): void {
    this.store.select('users').pipe(takeWhile(() => this.alive))
    .subscribe((usersResponse: UsersData) => {
      this.username = usersResponse.username;
      this.users = usersResponse.users;
      this.usersTotalCount = usersResponse.totalCount;
      this.hasPreviousPage = usersResponse.pageInfo.hasPreviousPage;
      this.hasNextPage = usersResponse.pageInfo.hasNextPage;
      this.startCursorToken = usersResponse.pageInfo.startCursor;
      this.endCursorToken = usersResponse.pageInfo.endCursor;
    })
  }

  getPaginationControl(): boolean {
    return this.usersTotalCount > this.itemsPerpage;
  }

  isUserAvailable(): boolean {
    return this.users.length > 0;
  }

  navigatePage(type: string): void {
    console.log(type);
    const value = type === 'next' ? this.endCursorToken : this.startCursorToken;
    this.userService.searchUser(this.username, {type, value});
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
