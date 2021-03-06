import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RoomsComponent } from './admin/rooms/rooms.component';
import { UsersComponent } from './admin/users/users.component';
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RoomDetailComponent } from './admin/rooms/room-detail/room-detail.component';
import { UserDetailComponent } from './admin/users/user-detail/user-detail.component';
import { UserEditComponent } from './admin/users/user-edit/user-edit.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RoomEditComponent } from "./admin/rooms/room-edit/room-edit.component";

/** Routing */
const routes: Routes = [
   { path: '', component: CalendarComponent },
   { path: 'admin/users', component: UsersComponent },
   { path: 'admin/rooms', component: RoomsComponent },
   { path: '404', component: PageNotFoundComponent },
   { path: '**', redirectTo: '/404' }
];

@NgModule({
   declarations: [
      AppComponent,
      MenuComponent,
      CalendarComponent,
      RoomsComponent,
      UsersComponent,
      PageNotFoundComponent,
      RoomDetailComponent,
      UserDetailComponent,
      UserEditComponent,
      RoomEditComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,   // for Template-driven Forms
      ReactiveFormsModule,    // for Reactive-driven Forms
      RouterModule.forRoot(routes)    // NEED to declare for our routing
   ],
   providers: [],
   bootstrap: [ AppComponent ]
})
export class AppModule {
}
