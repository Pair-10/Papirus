import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAuthorComponent } from './table-author.component';

describe('TableAuthorComponent', () => {
  let component: TableAuthorComponent;
  let fixture: ComponentFixture<TableAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableAuthorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
