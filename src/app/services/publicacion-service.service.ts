import { Injectable } from '@angular/core';
import { api } from '../settings/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publicacion } from '../interfaces/Publicacion';

@Injectable({
  providedIn: 'root'
})
export class PublicacionServiceService {

  private apiUrl = `${api.apiUrl}/Publicacion`;

  constructor(private http: HttpClient) { }

  getPublicacionesPorCategoria(Id: number): Observable<any[]> {

    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any[]>(`${this.apiUrl}/categoria/${Id}`, { headers });
  }
    

  getTodasPublicaciones(): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get<any>(`${this.apiUrl}/todas`, { headers });
  }

  getPublicaciones(): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(this.apiUrl, { headers });
  }

  createPublicacion(publicacion: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(this.apiUrl, publicacion, { headers });
  }

  editPublicacion(id: number, publicacion: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<any>(`${this.apiUrl}/${id}`, publicacion, { headers });
  }

  deletePublicacion(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }
}
