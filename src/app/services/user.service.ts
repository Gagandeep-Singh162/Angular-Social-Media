import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environment/environment';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthdate: string;
  status: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = environment.apiUrl;
  private apiUrl = `${this.url}users`;

  constructor(private http: HttpClient) {}

  getAllGenders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}genders`);
  }

  getAllProvinces(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}provinces`);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  login(email: string, password: string): Observable<any> {
    const loginUrl = `${this.url}users`;
    return this.http.get<any>(loginUrl).pipe(
      map((users) => {
        // Filter the users that match the email and password
        const user = users.find(
          (user: any) => user.email === email && user.password === password
        );
        if (user) {
          localStorage.setItem('id', user.id);
          localStorage.setItem('name', user.name);
          localStorage.setItem('email', user.email);
          return { ...user, password: undefined };
        } else {
          throw new Error('Invalid email or password');
        }
      })
    );
  }

  createUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }

  getUserByEmail(email: string): Observable<any> {
    const url = `${this.apiUrl}by_email/`;
    const params = new HttpParams().set('email', email);
    return this.http.get<any>(url, { params });
  }

  getUserById(userId: number): Observable<any> {
    const url = `${this.apiUrl}${userId}/`;
    return this.http.get<any>(url);
  }

  getVerifyExitsUser(email: string): Observable<any> {
    const encodedEmail = encodeURIComponent(email);
    const url = `${this.url}users?email=${encodedEmail}`;
    return this.http.get<any>(url);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}
