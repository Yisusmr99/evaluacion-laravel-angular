import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  private getHeaders(authenticated: boolean = false): HttpHeaders {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const token = localStorage.getItem('auth_token');
    
    if (authenticated && token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Método GET
  get<T>(endpoint: string, authenticated: boolean = false): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { headers: this.getHeaders(authenticated) });
  }

  // Método POST
  post<T>(endpoint: string, data: any, authenticated: boolean = false): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, { headers: this.getHeaders(authenticated) });
  }

  // Método PUT
  put<T>(endpoint: string, id: number, data: any, authenticated: boolean = false): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}/${id}`, data, { headers: this.getHeaders(authenticated) });
  }

  // Método DELETE
  delete<T>(endpoint: string, id: number, authenticated: boolean = false): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}/${id}`, { headers: this.getHeaders(authenticated) });
  }

  getById<T>(endpoint: string, id: number, authenticated: boolean = false): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}/${id}`, { headers: this.getHeaders(authenticated) });
  }
}
