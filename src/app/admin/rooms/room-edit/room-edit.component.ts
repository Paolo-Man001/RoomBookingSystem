import {Component, Input, OnInit} from '@angular/core';
import {Room} from "../../../model/Room";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {

  @Input() room: Room;

  /* Reactive forms must have formGroup and formControl properties to bind from the HTML.
  *   We can't bind them directly like 'Template-driven-Forms' used in the users component/views.
  *   ReactiveFormsModule must be registered in the app.component in order to use it.
  * */
  roomForm = new FormGroup(
    {
      roomName: new FormControl('roomName')
    }
  );


  constructor() {
  }

  ngOnInit() {
  }

}
