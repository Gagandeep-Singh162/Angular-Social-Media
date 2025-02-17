import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:8080/posts'; 

  constructor(private http: HttpClient) {}

  // Create a new post
  createPost(postData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, postData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error creating the post', error);
        return throwError(error);
      })
    );
  }

  // Get all posts
  getAllPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Get a post by ID
  getPostById(postId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${postId}`);
  }

  // Update a post by ID
  updatePost(postId: number, postData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${postId}`, postData);
  }

  // Delete a post by ID
  deletePost(postId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${postId}`);
  }

  // Get posts by user ID
  getPostsByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?user_id=${userId}`);
  }

  // Get posts by email
  getPostsByEmail(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?email=${email}`);
  }
}