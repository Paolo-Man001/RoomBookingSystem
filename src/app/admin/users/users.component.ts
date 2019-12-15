import {Component, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {User} from "../../model/User";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<User>;
  selectedUser: User;
  action: string;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    /*this.users = this.dataService.getUsers(); // REPLACE with an Observer/subscriber */
    /** subscribe to the Observable. 'next' is the data returned by Observable( Observable<Array<User>> ) */
    this.dataService.getUsers().subscribe(
      (next) => {
        this.users = next;
      }
    );

    this.route.queryParams.subscribe(
      (params) => {

        const id = params['id'];  // assign the 'id' number from params into our local 'const id'
        const action = params['action'];

        if (id) {
          this.selectedUser = this.users.find(user => user.id === +id);
          this.action = action;
        }

      }
    );
  } // End ngOnInit()

  setUser(id: number) {
    this.router.navigate(['admin', 'users'], {queryParams: {id, action: 'view'}});
  }

}
