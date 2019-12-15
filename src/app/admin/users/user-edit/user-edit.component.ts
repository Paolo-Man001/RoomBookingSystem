import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../model/User";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  message: string;

  /* @Input to bind variable to the HTML */
  @Input()
  user:User;

  constructor() { }

  ngOnInit() {
  }

}
