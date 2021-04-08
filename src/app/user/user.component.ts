import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { takeWhile } from 'rxjs/operators';

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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUser()
    .pipe(
      takeWhile(() => this.alive)
    )
    .subscribe(response => {
      this.usersTotalCount = response.total_count;
      this.users.push(...response.items);
    })
  }

  nextPage(event: number): void {
    this.currentPage = event;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
