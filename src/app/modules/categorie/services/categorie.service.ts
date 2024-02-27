import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { CategorieModel, ListCategoriesModel } from '../models/categorie.model';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpRequestStateService } from '../../../_metronic/shared/services/http-request-state.service';

const API_CATEGORIE_URL = `${environment.apiUrl}/products/categories`;

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private _httpRequestState: HttpRequestStateService
  ){}

  createCategorie(data: FormData){
    this._httpRequestState.onRequestStart();
    const headers = new HttpHeaders({'Authorization' : 'Bearer ' + this.authService.token})
    return this.http.post<CategorieModel>(`${API_CATEGORIE_URL}/add`, data, {headers: headers})
    .pipe(
      finalize(() => this._httpRequestState.onRequestEnd())
    );
  }

  allCategories(page = 1, search: string = ''){
    this._httpRequestState.onRequestStart();
    const headers = new HttpHeaders({'Authorization' : 'Bearer ' + this.authService.token})
    let filter = '';
    if(search){
      filter = `${filter}&search=${search}`;
    }

    return this.http.get<ListCategoriesModel>(`${API_CATEGORIE_URL}/all?page=${page}${filter}`, {headers: headers})
    .pipe(
      finalize(() => this._httpRequestState.onRequestEnd())
    );
  }

  update(categorie_id: any, data: any){
    this._httpRequestState.onRequestStart();
    const headers = new HttpHeaders({'Authorization' : 'Bearer ' + this.authService.token})
    return this.http.post<ListCategoriesModel>(`${API_CATEGORIE_URL}/update/${categorie_id}`, data, {headers: headers})
    .pipe(
      finalize(() => this._httpRequestState.onRequestEnd())
    );
  }

  delete(categorie_id: any){
    this._httpRequestState.onRequestStart();
    const headers = new HttpHeaders({'Authorization' : 'Bearer ' + this.authService.token})
    return this.http.delete<ListCategoriesModel>(`${API_CATEGORIE_URL}/delete/${categorie_id}`, {headers: headers})
    .pipe(
      finalize(() => this._httpRequestState.onRequestEnd())
    );
  }

}
