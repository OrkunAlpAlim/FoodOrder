import { Component } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { log } from 'console';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  searchQuery: string = '';
  filterQuery: string = '';
  list1: any[] = [];
  list2: any[] = [];
  public sidebarShow: boolean = true;

  ngModelOptions: { standalone: true } = { standalone: true };

  constructor(private foodService: FoodService) { }
  ngOnInit(): void {
    this.foodService.getFoodList1().subscribe(data1 => {
      this.list1 = data1.meals;
    });
    this.foodService.getFoodList2().subscribe(data2 => {
      this.list2 = data2.meals;
    });
  }
exit(){
  location.reload();
}
  search() {
    if (this.searchQuery.trim() === '') {
      this.foodService.getAll().subscribe(results => {
        this.foodService.updateSearchResults(results.meals);
      });
    } else {
      this.foodService.getSearchResults(this.searchQuery).subscribe(results => {
        this.foodService.updateSearchResults(results.meals);
      });
    }
  }

  

  filter1(category: string) {
    this.filterQuery = category;
    this.foodService.getFilter1Results(this.filterQuery).subscribe(results => {
      this.foodService.updateFilter1Results(results.meals);
    });
  }
  filter2(area: string) {
    this.filterQuery = area;
    this.foodService.getFilter2Results(this.filterQuery).subscribe(results => {
      this.foodService.updateFilter2Results(results.meals);
    });
  }
}