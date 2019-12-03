import {Injectable} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "./model/Room";
import { User } from './model/User';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //------ DUMMY Data ::
  private rooms: Array<Room>;
  private users: Array<User>;

  getRooms(): Observable<Array<Room>> {
    return of(this.rooms);
  }

  getUsers(): Observable<Array<User>>{
    return of(this.users);
  }

  constructor() {
    /*----------- USER Array -------------*/
    this.users = new Array<User>();

    const user1 = new User();   // User 1
    user1.id = 1;
    user1.name = 'John Doe';

    const user2 = new User();   // User 2
    user2.id = 2;
    user2.name = 'Mary Jane';

    const user3 = new User();   // User 3
    user3.id = 3;
    user3.name = 'Nebula Blue';

    this.users.push(user1);
    this.users.push(user2);
    this.users.push(user3);


    /*----------- ROOM Array -------------*/
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