import { Component, OnInit, Input} from '@angular/core';
import { Post } from '../../dtos/post';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user;
  posts: Post[];

  constructor() { }

  ngOnInit() {
    this.posts = this.user.posts;
  }

}
