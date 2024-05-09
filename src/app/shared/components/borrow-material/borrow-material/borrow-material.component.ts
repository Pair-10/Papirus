import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BorrowMaterialService } from '../../../../services/borrow-material/borrow-material.service';

@Component({
  selector: 'app-borrow-material',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './borrow-material.component.html',
  styleUrl: './borrow-material.component.css',
  providers:[BorrowMaterialService]
})
export class BorrowMaterialComponent implements OnInit {
  constructor(private borrowService: BorrowMaterialService) {}

  ngOnInit(): void {
    
  }
}
