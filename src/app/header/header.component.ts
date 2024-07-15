import { Component } from '@angular/core';
import { FoodService } from '../services/food/food.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchQuery: string = '';
  ngModelOptions: { standalone: true } = { standalone: true };

  constructor(private foodService: FoodService) {}

  search() {
    if (this.searchQuery.trim() === '') {
      // Eğer arama kutusu boşsa, tüm sonuçları getir
      this.foodService.getAll().subscribe(results => {
        this.foodService.updateSearchResults(results.meals);
      });
    } else {
      this.foodService.getSearchResults(this.searchQuery).subscribe(results => {
        this.foodService.updateSearchResults(results.meals);
      });
    }
  }
}
