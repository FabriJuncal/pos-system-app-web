import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchField } from './dynamic-search-form.model';

@Injectable({
  providedIn: 'root'
})
export class DynamicSearchFormService {

  private readonly _behaviorSubject  = new BehaviorSubject<SearchField[]>([]);

  public addFields(data: SearchField[]): void {
    this._behaviorSubject.next(data);
  }

  public getFields(): Observable<SearchField[]> {
    return this._behaviorSubject.asObservable();
  }
}
