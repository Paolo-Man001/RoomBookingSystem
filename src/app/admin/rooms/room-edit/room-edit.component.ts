import { Component, Input, OnInit } from '@angular/core';
import { Layout, LayoutCapacity, Room } from "../../../model/Room";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
   selector: 'app-room-edit',
   templateUrl: './room-edit.component.html',
   styleUrls: [ './room-edit.component.css' ]
})
export class RoomEditComponent implements OnInit {

   @Input() room: Room;

   layouts = Object.keys(Layout);
   layoutEnum = Layout;

   /** Reactive forms must have formGroup and formControl properties to bind to the HTML Elements.
    *   Set <form [formGroup]="roomForm"> for the parent tag. This will bind the parent-element.
    *   The children elements within the parent will be bound using the reference to their FormControlName.
    *
    *   ReactiveFormsModule must be registered in the app.component in order to use it.
    * */
       // roomForm = new FormGroup(
       //     {
       //        roomName: new FormControl('roomName'),
       //        location: new FormControl('location')
       //     }
       // );

       // using form-builder:
   roomForm: FormGroup;


   constructor( private formBuilder: FormBuilder ) {
   }

   ngOnInit() {
      /* use FormBuilder:  (we don't need patchValue() when using formBuilder) */
      this.roomForm = this.formBuilder.group(
          {
             roomName: this.room.name,
             location: this.room.location
          }
      );

      /**  patchValue() is a method that assigns the current room's
       *  properties into the bound property-value.
       * */
      /*this.roomForm.patchValue({
         roomName: this.room.name,
         location: this.room.location
      });*/

      /** Programmatically add FormControl for layout.
       * Use of 'addControl()'
       */
      for ( const layout of this.layouts ) {
         // this.roomForm.addControl(`layout${ layout }`, new FormControl(`layout${ layout }`));

         const layoutCapacity = this.room.capacities.find(lc => lc.layout === Layout[layout]);
         const initialCapacity = layoutCapacity == null ? 0 : layoutCapacity.capacity;    // ternary-check for capacity value null or not-null
         this.roomForm.addControl(`layout${ layout }`, this.formBuilder.control(initialCapacity));
      }
   }


   // Submit
   onSubmit() {
      console.log(this.roomForm);

      /**  Assign the NEW Input value into the current room being submitted
       *    2 ways to get the value from the FormGroup.FormControl object
       * */
      this.room.name = this.roomForm.value['roomName'];
      this.room.location = this.roomForm.controls['location'].value;
      this.room.capacities = new Array<LayoutCapacity>();
      for ( const layout of this.layouts ) {
         const layoutCapacity = new LayoutCapacity();
         layoutCapacity.layout = Layout[layout];
         layoutCapacity.capacity = this.roomForm.controls[`layout${ layout }`].value;
         this.room.capacities.push(layoutCapacity);
      }

      console.log(this.room);

      // TODO: call a method in the data service to save the room
   }

}
