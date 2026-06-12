import { Injectable, signal } from '@angular/core';

// Service to track global HTTP request loading state using signals
@Injectable({ providedIn: 'root' })
export class LoadingService {
  // Number of in-flight requests — counter pattern ensures accuracy with concurrent calls
  private activeRequests = signal(0);

  // Expose loading state as a derived signal (true when any request is active)
  readonly loading = signal(false);

  show(): void {
    this.activeRequests.update((count) => count + 1);
    this.loading.set(true);
  }

  hide(): void {
    this.activeRequests.update((count) => {
      const next = count - 1;
      if (next <= 0) {
        this.loading.set(false);
        return 0;
      }
      return next;
    });
  }
}
