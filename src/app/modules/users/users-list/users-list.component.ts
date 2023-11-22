import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUsersComponent } from '../components/add-users/add-users.component';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';
import { ModalConfig } from '../../../_metronic/partials/layout/modals/modal.config';
import { ModalComponent } from '../../../_metronic/partials';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @ViewChild('modal') private modalComponent: ModalComponent;

  modalAddUser: ModalConfig = {
    modalTitle: 'Crear Usuario',
    dismissButtonLabel: 'Guardar',
    closeButtonLabel: 'Cancel'
  };

  isLoading$: Observable<boolean>;
  isLoading = false;
  totalPages = 1;
  currentPage = 1;

  state: string;
  search: string;

  users: any = [];

  constructor(
    private fb: FormBuilder,
    private _userService: UsersService
    ) { }

  ngOnInit(): void {
    this.isLoading$ = this._userService.isLoading$;
    this.allUsers();
  }

  allUsers(page = 1){
    this._userService.allUsers(page, this.state, this.search)
    .subscribe((resp:any) => {
      console.log(resp);
      this.users = resp.users.data;
      this.totalPages = resp.total;
      this.currentPage = page;
    })
  }

  reset(){
    this.state = '';
    this.search = '';
    this.allUsers()
  }

  async addUser(){
    return await this.modalComponent.open();
  }

  // loadPage(index){
  //   this.allUsers(index);
  // }

  // editUser(user){
  //   const modalRef = this.modelService.open(EditUsersComponent, {centered: true, size: 'md'});
  //   modalRef.componentInstance.user_selected = user;
  //   modalRef.result.then(
  //     () => {

  //     },
  //     () => {

  //     }
  //   )

  //   modalRef.componentInstance.usersE.subscribe((resp:any) => {
  //     const INDEX = this.users.findIndex(user => user.id === resp.id);
  //     this.users[INDEX] = resp;
  //   });
  // }

  // delete(user){
  //   const modalRef = this.modelService.open(DeleteUserComponent, {centered: true, size: 'md'});
  //   modalRef.componentInstance.user_selected = user;
  //   modalRef.result.then(
  //     () => {

  //     },
  //     () => {

  //     }
  //   )

  //   modalRef.componentInstance.usersE.subscribe((resp:any) => {
  //     const INDEX = this.users.findIndex(user => user.id === resp.id);
  //     this.users.splice(INDEX, 1);
  //   });
  // }

}
