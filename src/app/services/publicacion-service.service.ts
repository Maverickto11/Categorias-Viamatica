import { Injectable } from '@angular/core';
import { api } from '../settings/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publicacion } from '../interfaces/Publicacion';

@Injectable({
  providedIn: 'root'
})
export class PublicacionServiceService {


  api = 'https://localhost:7139/api/Publicacion';

  constructor(private http: HttpClient) { }

  getPublicaciones(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>('https://localhost:7139/api/Publicacion', { headers });
  }

  // Crear una nueva publicación
  createPublicacion(publicacion: Publicacion): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<any>('https://localhost:7139/api/Publicacion', publicacion, { headers });
  }

  // Editar una publicación
  editPublicacion(id: number, publicacion: Publicacion): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put<any>(`${this.api}/${id}`, publicacion, { headers });
  }

  // Eliminar una publicación
  deletePublicacion(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete<any>(`${this.api}/${id}`, { headers });
  }
}