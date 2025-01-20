import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../settings/api';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = api.apiUrl;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get<any>('https://localhost:7139/api/Categorias');
  }
}
