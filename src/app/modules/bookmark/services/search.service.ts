import { Injectable } from '@angular/core';
import { Filter } from '../model/filter';
import { KIND_LINK, KIND_NOTE, KIND_TODO } from '../model/bookmark';

@Injectable()
export class FilterService {
  
  private search:Filter;

  constructor() { 
      this.search = Filter.create(KIND_LINK);
  }

  public update(filter: Filter) {
    this.search = filter;
  }

  public get(): Filter {
    return this.search;
  }

}
