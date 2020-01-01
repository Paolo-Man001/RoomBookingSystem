import { Component, Input, OnInit } from '@angular/core';
import { Room } from "../../../model/Room";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
   selector: 'app-room-edit',
   templateUrl: './room-edit.component.html',
   styleUrls: [ './room-edit.component.css' ]
})
export class RoomEditComponent implements OnInit {

   @Input() room: Room;

   /* Reactive forms must have formGroup and formControl properties to bind from the HTML.
   *   We can't bind them directly like 'Template-driven-Forms' used in the users component/views.
   *   ReactiveFormsModule must be registered in the app.component in order to use it.
   * */
   roomForm = new FormGroup(
       {
          roomName: new FormControl('roomName'),
          location: new FormControl('location')
       }
   );


   constructor() {
   }

   ngOnInit() {
      /*  patchValue() is a method that assigns the current room's
      *   properties into the bound property-value.
      * */
      this.roomForm.patchValue({
         roomName: this.room.name,
         location: this.room.location
      });
   }


   //Submit
   onSubmit() {
      // console.log(this.roomForm);

      /*  Assign the NEW Input value into the current room being submitted
      * */
      this.room.name = this.roomForm.value['roomName'];
      this.room.location = this.roomForm.controls['location'].value;
      console.log(this.room);
      // TODO: call a method in the data service to save the room
   }

}
