import { TestBed } from '@angular/core/testing';

import { AlumnsService } from './alumns.service';

describe('AlumnsService', () => {
  let service: AlumnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
