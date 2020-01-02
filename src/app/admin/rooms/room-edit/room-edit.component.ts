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

   /** Reactive forms must have formGroup and formControl properties to bind to the HTML Elements.
    *   Set <form [formGroup]="roomForm"> for the parent tag. This will bind the parent-element.
    *   The children elements within the parent will be bound using the reference to their FormControlName.
    *
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
      /**  patchValue() is a method that assigns the current room's
       *   properties into the bound property-value.
       * */
      this.roomForm.patchValue({
         roomName: this.room.name,
         location: this.room.location
      });
   }


   // Submit
   onSubmit() {
      console.log(this.roomForm);

      /**  Assign the NEW Input value into the current room being submitted
       *    2 ways to get the value from the FormGroup.FormControl object
       * */
      this.room.name = this.roomForm.value['roomName'];
      this.room.location = this.roomForm.controls['location'].value;
      console.log(this.room);

      // TODO: call a method in the data service to save the room
   }

}
