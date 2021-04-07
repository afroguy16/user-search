import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersResponse } from '../shared/types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get<UsersResponse>('https://api.github.com/search/users?q=example');
  }
}
