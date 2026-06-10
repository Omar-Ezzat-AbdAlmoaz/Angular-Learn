import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private currentUserKey = 'currentUser';

  constructor(private http: HttpClient) {}

  register(user: Omit<User, 'id'>): Observable<User> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      switchMap((users) => {
        const exists = users.find((u) => u.email === user.email);
        if (exists) {
          return throwError(() => new Error('Email already registered'));
        }
        return this.http.post<User>(this.apiUrl, user);
      })
    );
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map((users) => {
        const user = users.find(
          (u) => u.email === email && u.password === password
        );
        if (!user) {
          throw new Error('Invalid email or password');
        }
        this.setCurrentUser(user);
        return user;
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  getCurrentUser(): User | null {
    const data = localStorage.getItem(this.currentUserKey);
    return data ? JSON.parse(data) : null;
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }
}
