import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  foods: any[] = [];

  constructor(private foodService: FoodService) { }
  ngOnInit(): void {
    this.foodService.getAll().subscribe(data => {
      this.foods = data.meals;
    });
  }
}
