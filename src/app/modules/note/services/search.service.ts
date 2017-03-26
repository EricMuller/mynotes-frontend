import { Injectable } from '@angular/core';
import { Filter } from '../model/filter';
import { TYPE_LINK, TYPE_NOTE, TYPE_TODO } from '../model/note';

@Injectable()
export class FilterService {
  
  private search:Filter;

  constructor() { 
      this.search = Filter.create(TYPE_LINK);
  }

  public update(filter: Filter) {
    this.search = filter;
  }

  public get(): Filter {
    return this.search;
  }

}
