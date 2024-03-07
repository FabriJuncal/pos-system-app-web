import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchField } from './dynamic-search-form.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicSearchFormService } from './dynamic-search-form.service';

@Component({
  selector: 'app-dynamic-search-form',
  templateUrl: './dynamic-search-form.component.html',
  styleUrls: ['./dynamic-search-form.component.scss']
})
export class DynamicSearchFormComponent implements OnInit {
  searchFields: SearchField[] = [];
  @Output() searchSubmit: EventEmitter<any> = new EventEmitter();
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly _dynamicSearchFormService: DynamicSearchFormService
  ){}

  ngOnInit(): void {
    this._dynamicSearchFormService.getFields().subscribe((data) => {
      this.searchFields = this.sortByOrder(data);
      console.log('this.searchFields->', this.searchFields);
      this.form = this.fb.group({});
      this.searchFields.forEach(field => {
        this.form.addControl(field.name, this.fb.control(null));
      });
    });
  }

  onSearch(): void {
    // Implement search logic based on the search fields
    // Emit the search event with search criteria
    // this.search.emit(searchCriteria);
  }

  sortByOrder(campos: SearchField[]): SearchField[] {
    return campos.sort((a, b) => {
      if (a.order < b.order) {
        return -1;
      } else if (a.order > b.order) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
