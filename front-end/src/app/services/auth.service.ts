import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';
  private authState = new BehaviorSubject<boolean>(false);

  constructor(private apiService: ApiService, @Inject(PLATFORM_ID) private platformId: object) {
    this.authState.next(this.isAuthenticated());
  }

  // Método para iniciar sesión
  login(email: string, password: string): Observable<any> {
    return this.apiService.post('login', { email, password }).pipe(
      tap((response: any) => {
        if (response.result) {
          this.setToken(response.data.token);
          this.authState.next(true);
        }
      })
    );
  }

  // Método para cerrar sesión
  logout(): Observable<any> {
    return this.apiService.post('logout', {}, true).pipe(
      tap(() => {
        this.removeToken();
        this.authState.next(false);
      })
    );
  }

  // Obtener el token almacenado (verificando si está en el navegador)
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  // Guardar el token (verificando si está en el navegador)
  private setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  // Eliminar el token (verificando si está en el navegador)
  private removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
    }
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Observable para escuchar cambios en la autenticación
  getAuthState(): Observable<boolean> {
    return this.authState.asObservable();
  }
}