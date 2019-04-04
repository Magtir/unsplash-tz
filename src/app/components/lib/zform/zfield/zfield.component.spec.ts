import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZFieldComponent } from './zfield.component';

describe('ZfieldComponent', () => {
  let component: ZFieldComponent;
  let fixture: ComponentFixture<ZFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
