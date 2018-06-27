import {Injectable} from '@angular/core';
import {Filter} from '../model/filter';
import {KIND_LINK} from '../model/bookmark';

@Injectable()
export class FilterService {

  private _filter: Filter;

  constructor() {
    this._filter = Filter.create(KIND_LINK);
  }

  public update(filter: Filter) {
    this._filter = filter;
  }

  public get filter(): Filter {
    return this._filter;
  }

}
