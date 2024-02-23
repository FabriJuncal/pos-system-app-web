import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../auth';
import { finalize } from 'rxjs/operators';
import { RolModel } from '../models/roles.model';

const API_ROL_URL = `${environment.apiUrl}/rol`;

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>

  constructor(
    private http: HttpClient,
    public authService: AuthService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
   }

  createRol(data: FormData){
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({'Authorization' : 'Bearer ' + this.authService.token})
    return this.http.post<RolModel>(`${API_ROL_URL}/create`, data, {headers: headers})
    .pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  getRoles(page = 1, search: string = ''){
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({'Authorization' : 'Bearer ' + this.authService.token})
    let filter = '';
    if(search){
      filter = `${filter}&search=${search}`;
    }

    return this.http.get<RolModel>(`${API_ROL_URL}/all?page=${page}${filter}`, {headers: headers})
    .pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  updateRol(rol_id: number, data: any){
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({'Authorization' : 'Bearer ' + this.authService.token})
    return this.http.post<RolModel>(`${API_ROL_URL}/update/${rol_id}`, data, {headers: headers})
    .pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  deleteRol(rol_id: number){
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({'Authorization' : 'Bearer ' + this.authService.token})
    return this.http.delete<RolModel>(`${API_ROL_URL}/delete/${rol_id}`, {headers: headers})
    .pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
}
