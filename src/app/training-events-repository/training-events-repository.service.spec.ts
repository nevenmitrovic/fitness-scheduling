import { TestBed } from '@angular/core/testing';

import { TrainingEventsRepositoryService } from './training-events-repository.service';

describe('TrainingEventsRepositoryService', () => {
  let service: TrainingEventsRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingEventsRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
