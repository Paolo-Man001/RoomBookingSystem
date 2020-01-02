import { Component, Input, OnInit } from '@angular/core';
import { Layout, LayoutCapacity, Room } from "../../../model/Room";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DataService } from "../../../data.service";
import { Router } from "@angular/router";

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


   constructor( private formBuilder: FormBuilder,
                private dataService: DataService,
                private router: Router ) {
   }

   ngOnInit() {
      /** use FormBuilder:  (we don't need patchValue() when using formBuilder)
       *    Use Ng built-in 'Validators' object for the room-form fields.
       *    Multi-validators for one field/property must be contained in [].
       * */
      this.roomForm = this.formBuilder.group(
          {
             roomName: [ this.room.name, Validators.required ],
             location: [ this.room.location, [ Validators.required, Validators.minLength(3) ] ]
          }
      );

      /**  patchValue() is a method that assigns the current room's
       *  properties into the bound property-value.
       * */
      /*this.roomForm.patchValue({
         roomName: this.room.name,
         location: this.room.location
      });*/

      /** Programmatically add FormControl for layout,
       * by the use of 'addControl()' .
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

      // console.log(this.room);
      // console.log(this.roomForm);

      //--- Call addRoom or updateRoom method from data service and save the room
      if ( this.room.id == null ) {
         this.dataService.addRoom(this.room).subscribe(
             next => {
                this.router.navigate([ 'admin', 'rooms' ], { queryParams: { action: 'view', id: next.id } });
             }
         );
      } else {
         this.dataService.updateRoom(this.room).subscribe(
             next => {
                this.router.navigate([ 'admin', 'rooms' ], { queryParams: { action: 'view', id: next.id } })
             }
         );
      }
   }

}
