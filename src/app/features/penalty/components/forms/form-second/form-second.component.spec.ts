import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSecondComponent } from './form-second.component';

describe('FormSecondComponent', () => {
  let component: FormSecondComponent;
  let fixture: ComponentFixture<FormSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSecondComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
