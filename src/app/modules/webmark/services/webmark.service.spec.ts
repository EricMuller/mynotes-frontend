/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WebmarkService } from './webmark.service';

describe('NoteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebmarkService]
    });
  });

  it('should ...', inject([WebmarkService], (service: WebmarkService) => {
    expect(service).toBeTruthy();
  }));
});
