import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../model/User";
import {DataService} from "../../../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  /* @Input to bind variable to the HTML */
  @Input()
  user: User;
  formUser: User;
  message: string;
  password: string;
  password2: string;


  constructor(private dataService: DataService,
              private router: Router) {
  }

  ngOnInit() {
    this.formUser = Object.assign({}, this.user)
  }


  // METHODS:
  onSubmit() {
    if (this.formUser.id == null) {
      this.dataService.addUser(this.formUser, this.password)
        .subscribe((user) => {
          this.router.navigate(
            ['admin', 'users'],
            {queryParams: {action: 'view', id: user.id}}
          );
        });
    } else {

      this.dataService.updateUser(this.formUser)
        .subscribe((user) => {
          this.router.navigate(
            ['admin', 'users'],
            {queryParams: {action: 'view', id: user.id}}
          );
        });
    }
  } // End onSubmit()

}
