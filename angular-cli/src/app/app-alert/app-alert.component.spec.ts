import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAlertComponent } from './app-alert.component';

describe('AppAlertComponent', () => {
  let component: AppAlertComponent;
  let fixture: ComponentFixture<AppAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
