import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutReadyComponent } from './check-out.component';

describe('CheckOutComponent', () => {
  let component: CheckOutReadyComponent;
  let fixture: ComponentFixture<CheckOutReadyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckOutReadyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
