import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UsersData } from '../shared/types/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  alive = true;
  usersTotalCount = 0;
  itemsPerpage = 10;
  users = [];
  currentPage = 1;

  constructor(private store: Store<{users: UsersData}>) { }

  ngOnInit(): void {
    this.setUsers();
  }

  setUsers(): void {
    this.store.select('users').pipe(takeWhile(() => this.alive))
    .subscribe((usersResponse: UsersData) => {
      this.users = usersResponse.users;
      this.usersTotalCount = usersResponse.totalCount;
    })
  }

  getPaginationControl(): boolean {
    return this.usersTotalCount > this.itemsPerpage;
  }

  isUserAvailable(): boolean {
    return this.users.length > 0;
  }

  nextPage(event: number): void {
    this.currentPage = event;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
