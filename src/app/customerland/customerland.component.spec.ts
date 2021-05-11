import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerlandComponent } from './customerland.component';

describe('CustomerlandComponent', () => {
  let component: CustomerlandComponent;
  let fixture: ComponentFixture<CustomerlandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerlandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerlandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
