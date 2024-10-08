import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  foods: any[] = [];
  selectedFood: any = null;
example: any;

  constructor(private foodService: FoodService, private cartService: CartService, private http: HttpClient) { }

  ngOnInit(): void {
    this.foodService.getAll().subscribe(data => {
      this.foods = data.meals;
    });

    this.foodService.getSearchResultsObservable().subscribe(foods => {
      this.foods = foods;
    });
  }

  getFoodDetails(idMeal: string): void {
    this.foodService.getFoodDetails(idMeal).subscribe((data: any) => {
      this.selectedFood = data.meals[0];
    });
  }

  addToCart(food: any): void {
    this.cartService.addToCart(food);
  }

  showPopup(message:string): void {
    window.alert(message);
  }
}
