import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RolesService } from '../../services/roles.service';
import { RolModel } from '../../models/roles.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-delete-roles',
  templateUrl: './delete-roles.component.html',
  styleUrls: ['./delete-roles.component.scss']
})
export class DeleteRolesComponent {

  @Input() rol_selected: RolModel;
  @Output() rolesE: EventEmitter<any> = new EventEmitter();

  errorMessage: string;
  isLoading$: Observable<boolean>;
  isLoading = false;

  name: string;

  constructor(
    private _rolesService: RolesService,
    public modal: NgbActiveModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._rolesService.isLoading$;
    this.loadForm();
  }

  loadForm(){
    this.name = this.rol_selected.name;
  }

  delete(){
    this._rolesService.deleteRol(this.rol_selected.id)
    .pipe(
      catchError((message) => {
        this.errorMessage = message.error.errors;
        this.toastr.error(this.errorMessage);
        return of(undefined);
      })
    ).subscribe((resp:any) => {
      if(resp.status){
        this.toastr.success(resp.message);
        this.modal.close();
        this.rolesE.emit(this.rol_selected);
      }
    });
  }

}
