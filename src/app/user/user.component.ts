import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { takeWhile } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UsersResponse } from '../shared/types/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  alive = true;
  usersTotalCount = 0;
  users = [];
  currentPage = 1;

  constructor(private userService: UserService, private store: Store<{users: UsersResponse}>) { }

  ngOnInit(): void {
    this.setUsers();
  }

  setUsers(): void {
    this.store.select('users').pipe(takeWhile(() => this.alive))
    .subscribe((usersResponse: UsersResponse) => {
      this.users = usersResponse.items;
    })
  }

  nextPage(event: number): void {
    this.currentPage = event;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
