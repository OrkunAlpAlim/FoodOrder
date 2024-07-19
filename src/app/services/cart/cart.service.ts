import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cartItems';
  private cartItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  cartItems$: Observable<any[]> = this.cartItemsSubject.asObservable();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const items = this.getCartItemsFromLocalStorage();
      this.cartItemsSubject.next(items);
    }
  }

  private getCartItemsFromLocalStorage(): any[] {
    const items = localStorage.getItem(this.cartKey);
    return items ? JSON.parse(items) : [];
  }

  getCartItems(): any[] {
    if (this.isBrowser) {
      return this.getCartItemsFromLocalStorage();
    }
    return [];
  }

  addToCart(item: any) {
    if (this.isBrowser) {
      const items = this.getCartItemsFromLocalStorage();
      items.push(item);
      localStorage.setItem(this.cartKey, JSON.stringify(items));
      this.cartItemsSubject.next(items);
    }
  }

  removeFromCart(index: number) {
    if (this.isBrowser) {
      const items = this.getCartItemsFromLocalStorage();
      items.splice(index, 1);
      localStorage.setItem(this.cartKey, JSON.stringify(items));
      this.cartItemsSubject.next(items);
    }
  }
}
