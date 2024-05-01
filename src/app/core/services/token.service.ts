import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  setToken(Token: string) {
    localStorage.setItem('Token', Token);
  }

  getToken() {
    return localStorage.getItem('Token');
  }

  hasToken(): boolean {
    return this.getToken() != "";
  }
}