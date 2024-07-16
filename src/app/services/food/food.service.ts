import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FoodService {
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  private foodList1 = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
  private foodList2 = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
  private filterList1 = "www.themealdb.com/api/json/v1/1/filter.php?c=";
  private searchResults = new Subject<any[]>();
  private filterResults = new Subject<any[]>();

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getSearchResults(food: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${food}`);
  }

  updateSearchResults(results: any[]) {
    this.searchResults.next(results);
  }

  getSearchResultsObservable(): Observable<any[]> {
    return this.searchResults.asObservable();
  }

  getFoodList1(): Observable<any> {
    return this.http.get<any>(this.foodList1);
  }

  getFoodList2(): Observable<any> {
    return this.http.get<any>(this.foodList2);
  }
}
