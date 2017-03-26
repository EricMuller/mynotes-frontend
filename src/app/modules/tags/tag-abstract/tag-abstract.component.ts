import { Component, OnInit } from '@angular/core';
import { TagCloud } from '../model/tag-cloud'
import { ApiService } from 'app/shared/modules/api/api.service';
import { Observable } from 'rxjs/Rx';
import { TagService } from 'app/modules/tags/services/tag.service'
import { ObservableService } from 'app/shared/modules/observable/observable.service'

@Component({
  selector: 'app-tag-abstract',
  templateUrl: './tag-abstract.component.html',
  styleUrls: ['./tag-abstract.component.css']
})
export class TagAbstractComponent implements OnInit {

 

  constructor(protected apiservice: ApiService, private notifier: ObservableService) {
  }

  ngOnInit() {

  }

 

}
