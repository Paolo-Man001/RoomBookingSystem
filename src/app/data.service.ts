import {Injectable} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "./model/Room";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  rooms: Array<Room>;     // DUMMY Data

  constructor() {
    this.rooms = new Array<Room>();

    /** ROOM 1 */
    const room1 = new Room();
    room1.id=1;
    room1.name = 'First Room';
    room1.location = 'First Floor';

    // capacity 1
    const capacity1 = new LayoutCapacity();
    capacity1.layout = Layout.THEATER;
    capacity1.capacity = 50;

    // capacity 2
    const capacity2 = new LayoutCapacity();
    capacity2.layout = Layout.USHAPE;
    capacity2.capacity = 20;

    room1.capacities.push(capacity1);
    room1.capacities.push(capacity2);


    /** ROOM 2 */
    const room2 = new Room();
    room2.id=2;
    room2.name = 'Second Room';
    room2.location = 'Second Floor';

    // capacity 3
    const capacity3 = new LayoutCapacity();
    capacity3.layout = Layout.THEATER;
    capacity3.capacity = 60;

    room2.capacities.push(capacity3);


    /** PUSH to rooms */
    this.rooms.push(room1);
    this.rooms.push(room2);
  }
}
