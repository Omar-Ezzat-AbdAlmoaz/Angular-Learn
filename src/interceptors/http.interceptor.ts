import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { LoadingService } from '../services/loading';

// Global HTTP interceptor using Angular's functional interceptor API
// - Shows a loading indicator while any HTTP request is in progress
// - Catches HTTP errors globally and displays a user-friendly alert
export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Track request start
  loadingService.show();

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // User-friendly error messages based on status code
      let message = 'An unexpected error occurred. Please try again.';

      if (error.status === 0) {
        message = 'Unable to reach the server. Please check your connection.';
      } else if (error.status === 404) {
        message = 'The requested resource was not found.';
      } else if (error.status >= 500) {
        message = 'Server error. Please try again later.';
      } else if (error.error instanceof Error) {
        message = error.error.message;
      }

      alert(message);
      return throwError(() => error);
    }),
    // Always hide loading indicator when request completes (success or error)
    finalize(() => loadingService.hide())
  );
};
