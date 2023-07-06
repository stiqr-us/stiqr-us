import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StiqrComponent } from './stiqr.component';

describe('StiqrComponent', () => {
  let component: StiqrComponent;
  let fixture: ComponentFixture<StiqrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StiqrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StiqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
