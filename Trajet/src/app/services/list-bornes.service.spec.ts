import { TestBed } from '@angular/core/testing';

import { ListBornesService } from './list-bornes.service';

describe('ListBornesService', () => {
  let service: ListBornesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListBornesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
