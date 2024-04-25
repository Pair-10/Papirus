import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedMaterialsComponent } from './recommended-materials.component';

describe('RecommendedMaterialsComponent', () => {
  let component: RecommendedMaterialsComponent;
  let fixture: ComponentFixture<RecommendedMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendedMaterialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecommendedMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
