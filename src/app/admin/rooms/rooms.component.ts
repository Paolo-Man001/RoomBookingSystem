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

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {

    this.rooms = this.dataService.rooms;

    this.route.queryParams.subscribe(
      (params) => {
        const id = params['id'];
        if (id) {
          this.selectedRoom = this.rooms.find(room => room.id === Number(id));  // can use '+id' to cast 'id' from string-type TO number-type
        }
      }
    );

  } // End ngOnInit()

  setRoom(id: number) {
    this.router.navigate(['admin', 'rooms'], {queryParams: {id: id}});
  }

}
