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
  private filterList1 = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
  private filterList2 = "https://www.themealdb.com/api/json/v1/1/filter.php?a=";
  private results = new Subject<any[]>();

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getSearchResults(food: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${food}`);
  }

  updateSearchResults(results: any[]) {
    this.results.next(results);
  }

  getSearchResultsObservable(): Observable<any[]> {
    return this.results.asObservable();
  }

  getFoodList1(): Observable<any> {
    return this.http.get<any>(this.foodList1);
  }

  getFoodList2(): Observable<any> {
    return this.http.get<any>(this.foodList2);
  }



  getFilter1Results(category: string): Observable<any> {
    return this.http.get<any>(`${this.filterList1}${category}`);
  }

  updateFilter1Results(results: any[]) {
    this.results.next(results);
  }

  getFilter1ResultsObservable(): Observable<any[]> {
    return this.results.asObservable();
  }


  getFilter2Results(area: string): Observable<any> {
    return this.http.get<any>(`${this.filterList2}${area}`);
  }

  updateFilter2Results(results: any[]) {
    this.results.next(results);
  }

  getFilter2ResultsObservable(): Observable<any[]> {
    return this.results.asObservable();
  }
}
