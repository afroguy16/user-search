import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserService } from '../user/user.service';

const SEARCH_DELAY = 1000;

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})
export class SearchUsersComponent implements OnInit {
  alive = true;
  searchValue = '';
  searchUsersControl: FormControl;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.activateSearchUsersInput();
  }

  activateSearchUsersInput(): void {
    this.searchUsersControl = new FormControl();

    this.searchUsersControl.valueChanges.pipe(debounceTime(SEARCH_DELAY), distinctUntilChanged())
      .subscribe(value => {
        value && this.userService.getUser(value);
      });
  }

  searchUsers(event): void {
    console.log(event)
  }

}
