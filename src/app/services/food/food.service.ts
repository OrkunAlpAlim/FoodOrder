import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  private searchResults = new Subject<any[]>();

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
}
