import { CanActivateFn } from '@angular/router';
import { JWT_ROLES } from '../constants/jwtAttribute';
import { inject } from '@angular/core';
import { JwtService } from '../services/jwt/jwt.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const jwtService=inject(JwtService);
  let token: any = localStorage.getItem('Token');
  let decodedToken = jwtService.getDecodedAccessToken(token)
  let userRoles:string[]= decodedToken[JWT_ROLES] || "";
  let requiredRoles:string[] = route.data["requiredRoles"] || [];
  let hasRole=false;
  requiredRoles.forEach((role) => {
    if(userRoles.includes(role)) hasRole =true;
  });
  return hasRole;
};