// // jwttoken.service.ts

// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class JwtTokenService {
//   private token: string | null = null;

//   constructor() {}

//   getToken(): string | null {
//     return this.token;
//   }

//   setToken(token: string): void {
//     this.token = token;
//   }

//   clearToken(): void {
//     this.token = null;
//   }
// }
// jwttoken.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {
  private token: string | null = null;

  constructor() {}

  getToken(): string | null {
    return this.token;
  }

  setToken(token: string): void {
    this.token = token;
  }

  clearToken(): void {
    this.token = null;
  }
}
