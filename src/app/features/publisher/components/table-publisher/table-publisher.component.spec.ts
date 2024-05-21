import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePublisherComponent } from './table-publisher.component';

describe('TablePublisherComponent', () => {
  let component: TablePublisherComponent;
  let fixture: ComponentFixture<TablePublisherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePublisherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablePublisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
