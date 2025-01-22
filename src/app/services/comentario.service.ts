import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { api } from '../settings/api';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  apiUrl = api.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getComentarios(publicacionId: number): Observable<any[]> {
    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/Comentario/publicacion/${publicacionId}`, { headers });
  }

  createComentario(publicacionId: number, contenido: string): Observable<any> {
    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/Comentario/${publicacionId}/comentarios`,{ Contenido: contenido }, { headers });
  }

  
  /*createComentario(publicacionId: number, contenido: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/comentarios/${publicacionId}/comentarios`, { Contenido: contenido });
  }*/

  editComentario(comentarioId: number, contenido: string): Observable<any> {
    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/Comentario/${comentarioId}`, { Contenido: contenido }, { headers });
  }

  deleteComentario(comentarioId: number): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/Comentario/${comentarioId}`, { headers });
  }
}