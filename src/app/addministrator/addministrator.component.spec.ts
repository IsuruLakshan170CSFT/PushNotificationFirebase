import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddministratorComponent } from './addministrator.component';

describe('AddministratorComponent', () => {
  let component: AddministratorComponent;
  let fixture: ComponentFixture<AddministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddministratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
