import { TestBed } from '@angular/core/testing';

import { ListVehiculeService } from './list-vehicule.service';

describe('ListVehiculeService', () => {
  let service: ListVehiculeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListVehiculeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
