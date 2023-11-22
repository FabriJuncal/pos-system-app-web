import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AddUsersComponent } from './components/add-users/add-users.component';
import { EditUsersComponent } from './components/edit-users/edit-users.component';
import { DeleteUsersComponent } from './components/delete-users/delete-users.component';
import { ModalsModule, WidgetsModule } from '../../_metronic/partials';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    AddUsersComponent,
    EditUsersComponent,
    DeleteUsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    WidgetsModule,
    ModalsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
