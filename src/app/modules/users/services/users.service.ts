import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuthService, UserModel } from '../../auth';
import { finalize } from 'rxjs/operators';
import { HttpRequestStateService } from '../../../_metronic/shared/services/http-request-state.service';

const API_AUTH_URL = `${environment.apiUrl}/admin`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private _httpRequestState: HttpRequestStateService
  ) {}

  registration(data: UserModel){
    this._httpRequestState.onRequestStart();
    const headers = new HttpHeaders({'Authorization' : 'Bearer ' + this.authService.token})
    return this.http.post<UserModel>(`${API_AUTH_URL}/register`, data, {headers: headers})
    .pipe(
      finalize(() => this._httpRequestState.onRequestEnd())
    );
  }

  allUsers(page = 1, state: string = '', search: string = ''){
    this._httpRequestState.onRequestStart();
    const headers = new HttpHeaders({'Authorization' : 'Bearer ' + this.authService.token})
    let filter = '';
    if(state){
      filter = `${filter}&state=${state}`;
    }
    if(search){
      filter = `${filter}&search=${search}`;
    }

    return this.http.get<UserModel>(`${API_AUTH_URL}/all?page=${page}${filter}`, {headers: headers})
    .pipe(
      finalize(() => this._httpRequestState.onRequestEnd())
    );
  }

  update(user_id: number, data: any){
    this._httpRequestState.onRequestStart();
    const headers = new HttpHeaders({'Authorization' : 'Bearer ' + this.authService.token})
    return this.http.put<UserModel>(`${API_AUTH_URL}/update/${user_id}`, data, {headers: headers})
    .pipe(
      finalize(() => this._httpRequestState.onRequestEnd())
    );
  }

  delete(user_id: number){
    this._httpRequestState.onRequestStart();
    const headers = new HttpHeaders({'Authorization' : 'Bearer ' + this.authService.token})
    return this.http.delete<UserModel>(`${API_AUTH_URL}/delete/${user_id}`, {headers: headers})
    .pipe(
      finalize(() => this._httpRequestState.onRequestEnd())
    );
  }
}
