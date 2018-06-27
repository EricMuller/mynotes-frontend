import { TestBed, inject } from '@angular/core/testing';

import { MatTabStore } from './tab-store.service';

describe('RouterStoreService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatTabStore]
    });
  });

  it('should ...', inject([MatTabStore], (service: MatTabStore) => {
    expect(service).toBeTruthy();
  }));


});
