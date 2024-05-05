import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowMaterialComponent } from './borrow-material.component';

describe('BorrowMaterialComponent', () => {
  let component: BorrowMaterialComponent;
  let fixture: ComponentFixture<BorrowMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowMaterialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BorrowMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
