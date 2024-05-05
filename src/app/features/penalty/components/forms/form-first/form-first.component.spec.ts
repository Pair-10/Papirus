import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFirstComponent } from './form-first.component';

describe('FormFirstComponent', () => {
  let component: FormFirstComponent;
  let fixture: ComponentFixture<FormFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFirstComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
