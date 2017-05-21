import { TestBed, inject } from '@angular/core/testing';

import { MdTabStore } from './tab-store.service';

describe('RouterStoreService', () => {
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MdTabStore]
    });
  });

  it('should ...', inject([MdTabStore], (service: MdTabStore) => {
    expect(service).toBeTruthy();
  }));


});
