import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './dtos/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getUserFullDetails().subscribe(() => {
      this.users = this.userService.getUsers();
    });
  }
}
