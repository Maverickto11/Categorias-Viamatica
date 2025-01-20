import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../settings/api';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { LoginResponse } from '../interfaces/LoginResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = api.apiUrl;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  registrarUsuario(usuario: any) {
    return this.http.post(`${this.api}/Auth/registro`, usuario);
  }

  login(credentials: { correo: string; contrasena: string }): Observable<any> {
    return this.http.post('https://localhost:7139/api/Auth/login', credentials);
  }

  // Método para obtener el token almacenado
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  // Método para cerrar sesión
  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}