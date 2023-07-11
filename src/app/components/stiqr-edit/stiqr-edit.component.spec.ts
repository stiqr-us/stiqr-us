import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StiqrEditComponent } from './stiqr-edit.component';

describe('StiqrEditComponent', () => {
  let component: StiqrEditComponent;
  let fixture: ComponentFixture<StiqrEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StiqrEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StiqrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
