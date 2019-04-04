import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZFormComponent } from './zform.component';

describe('ZFormComponent', () => {
  let component: ZFormComponent;
  let fixture: ComponentFixture<ZFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
