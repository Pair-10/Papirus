import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePenaltyAdminComponent } from './table-penalty-admin.component';

describe('TablePenaltyAdminComponent', () => {
  let component: TablePenaltyAdminComponent;
  let fixture: ComponentFixture<TablePenaltyAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePenaltyAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablePenaltyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
