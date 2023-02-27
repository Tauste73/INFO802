import { TestBed } from '@angular/core/testing';

import { TempsTrajetService } from './temps-trajet.service';

describe('TempsTrajetService', () => {
  let service: TempsTrajetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempsTrajetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
