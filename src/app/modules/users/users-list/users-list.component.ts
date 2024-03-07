import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUsersComponent } from '../components/add-users/add-users.component';
import { UsersService } from '../services/users.service';
import { ModalConfig } from '../../../_metronic/partials/layout/modals/modal.config';
import { ModalComponent } from '../../../_metronic/partials';
import { EditUsersComponent } from '../components/edit-users/edit-users.component';
import { DeleteUsersComponent } from '../components/delete-users/delete-users.component';
import { RolesService } from '../../roles/services/roles.service';
import { RolModel } from '../../roles/models/roles.model';
import { HttpRequestStateService } from 'src/app/_metronic/shared/services/http-request-state.service';
import { SearchField, SelectField } from '../../../_metronic/shared/components/dynamic-search-form/dynamic-search-form.model';
import { DynamicSearchFormService } from '../../../_metronic/shared/components/dynamic-search-form/dynamic-search-form.service';
import { finalize, map } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit{

  @ViewChild('modal') private modalComponent: ModalComponent;

  formGroup: FormGroup

  modalAddUser: ModalConfig = {
    modalTitle: 'Crear Usuario',
  };

  isLoading$: any;

  totalPages = 1;
  currentPage = 1;

  state: string;
  search: string;

  users: any = [];
  validatePassword: any;

  roles: RolModel[];
  selectedRol: SelectField[];

  searchFields: SearchField[];

  constructor(
    private fb: FormBuilder,
    private _userService: UsersService,
    private _rolesService: RolesService,
    private modelService: NgbModal,
    private _httpRequestStateService: HttpRequestStateService,
    private readonly _dynamicSearchFormService: DynamicSearchFormService
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._httpRequestStateService.getRequestState();
    this.loadUsers();
    this.loadRoles();
    this.initComponents();
  }

  loadUsers(page = 1): void {
    this._userService.allUsers(page)
      .subscribe((resp: any) => {
        this.users = resp.users.data;
        this.totalPages = resp.total;
        this.currentPage = page;
      });
  }

  loadRoles(): void {
    this._rolesService.getRoles()
    .subscribe((resp:any) =>{
      console.log('allRoles->',resp);
      this.roles = resp.roles.data;
      this.selectedRol = this.roles.map((rol: RolModel) => ({
        value: rol.id,
        label: rol.name
      }));

      this.searchFields.push({
        order: 2,
        name: 'selectedRol',
        label: {
          bold: 'Filtrar',
          normal: 'por Rol'
        },
        size: '6',
        placeholder: 'Selecciona un Rol',
        type: 'select',
        options: this.selectedRol
      });

      this._dynamicSearchFormService.addFields(this.searchFields);
    });
  }


  reset(): void {
    this.loadUsers();
  }

  addUser(): void {
    const modalRef = this.modelService.open(AddUsersComponent, { centered: true, size: 'md' });
    modalRef.result.then(
      () => {
        // Handle success
      },
      () => {
        // Handle dismissal
      }
    );

    modalRef.componentInstance.usersE.subscribe((resp: any) => {
      this.users.unshift(resp);
    });
  }

  loadPage(index: any): void {
    this.loadUsers(index);
  }

  editUser(user: any): void {
    const modalRef = this.modelService.open(EditUsersComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.user_selected = user;
    modalRef.result.then(
      () => {
        // Handle success
      },
      () => {
        // Handle dismissal
      }
    );

    modalRef.componentInstance.usersE.subscribe((resp:any) => {
      const INDEX = this.users.findIndex((user: any) => user.id === resp.id);
      this.users[INDEX] = resp;
    });
  }

  deleteUser(user: any): void {
    const modalRef = this.modelService.open(DeleteUsersComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.user_selected = user;
    modalRef.result.then(
      () => {
        // Handle success
      },
      () => {
        // Handle dismissal
      }
    );

    modalRef.componentInstance.usersE.subscribe((resp:any) => {
      const INDEX = this.users.findIndex((user: any) => user.id === resp.id);
      this.users.splice(INDEX, 1);
    });
  }

  initComponents(){
    this.searchFields = [
      {
        order: 1,
        name: 'searchText',
        label: {
          bold: 'Buscar',
          normal: 'por correo y nombre'
        },
        size: '6',
        placeholder: 'Ingrese un Correo o Nombre',
        type: 'inputText',
      },
      {
        order: 3,
        name: 'state',
        label: {
          bold: 'Filtrar',
          normal: 'por Estado'
        },
        size: '3',
        placeholder: 'Selecciona el Estado',
        type: 'select',
        options: [
          {
            value: '1',
            label: 'Activo'
          },
          {
            value: '2',
            label: 'Inactivo'
          }
        ],
      },
    ];

    this._dynamicSearchFormService.addFields(this.searchFields);
  }

}
