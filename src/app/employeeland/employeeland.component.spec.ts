import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeelandComponent } from './employeeland.component';

describe('EmployeelandComponent', () => {
  let component: EmployeelandComponent;
  let fixture: ComponentFixture<EmployeelandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeelandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeelandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
