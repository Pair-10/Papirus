import { HttpInterceptorFn } from '@angular/common/http';

export const autInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("Token");
  if (token) {
    const cloneRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloneRequest);
  }
  else {
    return next(req); 
  }
}

  
