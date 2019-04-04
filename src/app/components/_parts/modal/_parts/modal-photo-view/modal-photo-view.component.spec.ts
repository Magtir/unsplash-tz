import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPhotoViewComponent } from './modal-photo-view.component';

describe('ModalPhotoViewComponent', () => {
  let component: ModalPhotoViewComponent;
  let fixture: ComponentFixture<ModalPhotoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPhotoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPhotoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
