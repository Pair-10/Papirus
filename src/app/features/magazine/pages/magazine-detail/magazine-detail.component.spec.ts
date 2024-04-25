import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazineDetailComponent } from './magazine-detail.component';

describe('MagazineDetailComponent', () => {
  let component: MagazineDetailComponent;
  let fixture: ComponentFixture<MagazineDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagazineDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MagazineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
