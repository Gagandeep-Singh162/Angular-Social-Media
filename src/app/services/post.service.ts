import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environment/environment';
import { Post } from '../Models/PostModels';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url = environment.apiUrl;
  private apiUrl = `${this.url}posts/`;

  constructor(private http: HttpClient) {}

  // Create a new post
  createPost(postData: Partial<Post>): Observable<any> {
    debugger;
    return this.http.post<Post>(this.apiUrl, postData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error creating the post', error);
        return throwError(error);
      })
    );
  }

  // Get all posts
  getAllPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get a post by ID
  getPostById(postId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${postId}`);
  }

  // Update a post by ID
  updatePost(postId: number, postData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${postId}`, postData);
  }

  // Delete a post by ID
  deletePost(postId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${postId}`);
  }

  // Get posts by user ID
  getPostsByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?user_id=${userId}`);
  }

  // Get posts by email
  getPostsByEmail(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`);
  }
}
