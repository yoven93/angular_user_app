
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { merge, finalize } from 'rxjs/operators';
import { User } from '../dtos/user';
import { environment } from '../../environments/environment';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';
import { Post } from '../dtos/post';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users: User[];

  constructor(private _http: HttpClient) {

    // Initialize the list of users with only ids
    this._users = [
      {
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      }
    ];
  }


  // Method to get the list of users
  public getUsers(): User[] {
    return this._users;
  }

  // Method to populate the list of users
  public getUserFullDetails(): Observable<any> {

    return new Observable( observable => {

      let count = 0;

      this._users.forEach( user => {

        this.getUserInfo(user)
        .pipe(merge(this.getUserPosts(user)))
        .subscribe(() => {
          count++;
          if (count == this._users.length * 2) {
            observable.next();
          }
        });
      });
    });
  }

  // Method to get the user info (name, email and address) of a user
  private getUserInfo(user: User) : Observable<any> {

    return new Observable( observable => {

      this._http.get(environment.url + "/users/" + user.id)
      .pipe(finalize(() => { observable.complete() }))
      .subscribe( (data: any) => {

        // Set name, email and address
        user.name = data.name;
        user.email = data.email;
        user.address = {
          city: data.address.city,
          zipcode: data.address.zipcode
        };

        observable.next();
      });
    });
  }


  // Method to get posts of a user
  private getUserPosts(user: User): Observable<any> {

    return new Observable( observable => {

      const httpParams: HttpParams = new HttpParams()
                                     .set("userId", user.id.toString());

      this._http.get(environment.url + "/posts", { params: httpParams })
      .pipe(finalize(() => { observable.complete() }))
      .subscribe( (data: any) => {

        const posts: Post[] = [];
        user.posts = posts;

        data.forEach( post => {

          posts.push({
            id: post.id,
            title: post.title,
            userId: post.userId
          });
        });

        observable.next();
      });
    });
  }
}
