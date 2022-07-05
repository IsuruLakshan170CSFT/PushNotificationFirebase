import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeConvertComponent } from './time-convert.component';

describe('TimeConvertComponent', () => {
  let component: TimeConvertComponent;
  let fixture: ComponentFixture<TimeConvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeConvertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeConvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
