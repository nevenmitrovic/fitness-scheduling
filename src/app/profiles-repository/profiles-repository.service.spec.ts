import { TestBed } from '@angular/core/testing';

import { ProfilesRepositoryService } from './profiles-repository.service';

describe('ProfilesRepositoryService', () => {
  let service: ProfilesRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilesRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
