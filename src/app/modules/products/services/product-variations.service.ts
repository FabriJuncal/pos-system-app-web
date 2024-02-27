import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ListProductVariationsModel, ProductVariationsModel } from '../models/product-variations.model';
import { HttpRequestStateService } from '../../../_metronic/shared/services/http-request-state.service';

const API_PRODUCT_VARIATIONS_URL = `${environment.apiUrl}/products/variations`;

@Injectable({
  providedIn: 'root'
})
export class ProductVariationsService {

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private _httpRequestState: HttpRequestStateService
  ){}

  createProductVariations(data: FormData){
    this._httpRequestState.onRequestStart();
    const headers = new HttpHeaders({'Authorization' : 'Bearer ' + this.authService.token})
    return this.http.post<ProductVariationsModel>(`${API_PRODUCT_VARIATIONS_URL}/add`, data, {headers: headers})
    .pipe(
      finalize(() => this._httpRequestState.onRequestEnd())
    );
  }

  allProductVariations(page = 1, search: string = ''){
    this._httpRequestState.onRequestStart();
    const headers = new HttpHeaders({'Authorization' : 'Bearer ' + this.authService.token})
    let filter = '';
    if(search){
      filter = `${filter}&search=${search}`;
    }

    return this.http.get<ListProductVariationsModel>(`${API_PRODUCT_VARIATIONS_URL}/all?page=${page}${filter}`, {headers: headers})
    .pipe(
      finalize(() => this._httpRequestState.onRequestEnd())
    );
  }

  update(categorie_id: any, data: any){
    this._httpRequestState.onRequestStart();
    const headers = new HttpHeaders({'Authorization' : 'Bearer ' + this.authService.token})
    return this.http.post<ListProductVariationsModel>(`${API_PRODUCT_VARIATIONS_URL}/update/${categorie_id}`, data, {headers: headers})
    .pipe(
      finalize(() => this._httpRequestState.onRequestEnd())
    );
  }

  delete(categorie_id: any){
    this._httpRequestState.onRequestStart();
    const headers = new HttpHeaders({'Authorization' : 'Bearer ' + this.authService.token})
    return this.http.delete<ListProductVariationsModel>(`${API_PRODUCT_VARIATIONS_URL}/delete/${categorie_id}`, {headers: headers})
    .pipe(
      finalize(() => this._httpRequestState.onRequestEnd())
    );
  }

}
