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

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // User from dataService
    this.users = this.dataService.users;

    this.route.queryParams.subscribe(
      (params) => {

        const id = params['id'];  // assign the 'id' number from params into our local 'const id'

        if (id) {
          this.selectedUser = this.users.find(user => user.id === +id);
        }

      }
    );
  } // End ngOnInit()

  setUser(id: number) {
    this.router.navigate(['admin', 'users'], {queryParams: {id: id}});
  }

}
