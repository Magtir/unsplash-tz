import { TestBed } from '@angular/core/testing';

import { PhotoViewService } from './photo-view.service';

describe('PhotoViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhotoViewService = TestBed.get(PhotoViewService);
    expect(service).toBeTruthy();
  });
});
