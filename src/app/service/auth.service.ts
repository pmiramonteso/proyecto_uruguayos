import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000'; //Back

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/usuarios`, { email, password }).pipe(
      catchError(this.handleError)
    );
  }

  register(nombre: string, apellidos: string, email: string, password: string): Observable<any> {
    const body = { nombre, apellidos, email, password };
    return this.http.post(`${this.apiUrl}/api/usuarios`, body).pipe(
      catchError((error) => {
          if (error.error.message === 'El correo ya está registrado') {
              return throwError(() => new Error('Este correo ya está registrado.'));
          }
          return throwError(() => new Error(error.message));
      })
  );
}

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      if (this.isTokenExpired(decodedToken)) {
        this.logout();
        return false;
      }
      return true;
    }
    return false;
  }

  isAdmin(): boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken.rol === 'admin';
    }
    return false;
  }

  decodeToken(token: string) {
    const payload = atob(token.split('.')[1]);
    return JSON.parse(payload);
  }

  isTokenExpired(decodedToken: any): boolean {
    const expDate = decodedToken.exp * 1000;
    return new Date().getTime() > expDate;
  }

  logout() {
    localStorage.removeItem('token');
  }

  private handleError(error: any) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
