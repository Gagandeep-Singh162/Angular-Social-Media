import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environment/environment';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthdate: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  private url = environment.apiUrl;
  private apiUrl = `${this.url}users/`;

  constructor(private http: HttpClient) {}

  getUserByID(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/getUserByID/${userId}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error.message || 'Server error');
  }
}
