import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url = environment.apiUrl;
  private apiUrl = `${this.url}categories/`;

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCategoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`);
  }

  createCategory(categoryData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, categoryData);
  }

  updateCategory(id: number, categoryData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, categoryData);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }
}
