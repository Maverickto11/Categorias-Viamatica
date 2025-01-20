import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../settings/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = api.apiUrl;

  constructor(private http: HttpClient) {}

  registrarUsuario(usuario: any) {
    return this.http.post(`${this.api}/Auth/registro`, usuario);
  }

  login(credenciales: { Correo: string; Contrasena: string }): Observable<any> {
    console.log('Credenciales enviadas:', credenciales); // Verifica los datos enviados
    return this.http.post(`${this.api}/Auth/login`, credenciales);
  }

  guardarToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('authToken');
  }

  cerrarSesion(): void {
    localStorage.removeItem('authToken');
  }

  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }
}
