import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PenaltyAdminComponent } from './penalty-admin.component';

describe('PenaltyComponent', () => {
  let component: PenaltyAdminComponent;
  let fixture: ComponentFixture<PenaltyAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenaltyAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenaltyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
