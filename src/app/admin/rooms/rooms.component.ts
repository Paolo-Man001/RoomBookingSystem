import {Component, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {Room} from "../../model/Room";
import {ActivatedRoute, Router} from "@angular/router";
import {isNumber} from "util";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: Array<Room>;
  selectedRoom: Room;
  action: string;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    /*this.rooms = this.dataService.getRooms(); // REPLACE for a subscriber of the Observable */
    /** subscribe to the Observable. 'next' is the data returned by Observable( Observable<Array<Room>> ) */
    this.dataService.getRooms().subscribe(
      (next) => {
        this.rooms = next;
      }
    );

    this.route.queryParams.subscribe(
      (params) => {
        const id = params['id'];
        if (id) {
          this.selectedRoom = this.rooms.find(room => room.id === Number(id));  // can use '+id' to cast 'id' from string-type TO number-type
          this.action = params['action'];
        }

        if (params['action'] === 'add') {
          this.selectedRoom = new Room();
          this.action = 'edit';
        }
      }
    );

  } // End ngOnInit()

  setRoom(id: number) {
    this.router.navigate(['admin', 'rooms'], {queryParams: {id, action: 'view'}});
  }


  addRoom() {
    this.router.navigate(['admin', 'rooms'], {queryParams: {action: 'add'}});
  }

}
