/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthgardService } from './authgard.service';

describe('AuthgardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthgardService]
    });
  });

  it('should ...', inject([AuthgardService], (service: AuthgardService) => {
    expect(service).toBeTruthy();
  }));
});
