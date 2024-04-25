import { CanActivateFn } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { JWT_ROLES } from '../constants/jwtAttribute';

export const roleGuard: CanActivateFn = (route, state) => {

  let token = localStorage.getItem('Token');
  if(token == null) return false;
  let decodedToken = jwtDecode<any>(token);
  console.log(decodedToken);
  let userRoles:string[]= decodedToken[JWT_ROLES] || "";
  let requiredRoles:string[] = route.data["requiredRoles"] || [];
  let hasRole=false;
  requiredRoles.forEach((role) => {
    if(userRoles.includes(role)) hasRole =true;
  });





  return hasRole;
};
