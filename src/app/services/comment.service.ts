import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../environment/environment';

export interface CommentResponse {
  id: string;
  commentId: string;
  userId: string;
  content: string;
  timeCreated: string;
}

export interface Comment {
  id?: string; // Cambiar a opcional
  postId: number;
  userId: string;
  content: string;
  timeCreated: string;
  responses: CommentResponse[];
}

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private url = environment.apiUrl;
  private apiUrl = `${this.url}comments/`;
  comments: Comment[] = [];

  constructor(private http: HttpClient) {}

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}`);
  }

  // Add a new response to a comment
  addResponse(commentId: string, newResponse: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${commentId}`).pipe(
      switchMap((comment) => {
        comment.responses.push(newResponse);
        return this.http.put(`${this.apiUrl}${commentId}`, comment);
      })
    );
  }

  getCommentsByPostId(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}?postId=${postId}`);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}`, comment);
  }

  deleteCommentsByPostId(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/post/${postId}/delete`);
  }

  countCommentsByPostId(postId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}?postId=${postId}`);
  }

  updateComment(
    id: string,
    comment: Comment,
    userId: number
  ): Observable<Comment> {
    return this.http.put<Comment>(
      `${this.apiUrl}/${id}/update?userId=${userId}`,
      comment
    );
  }

  deleteComment(id: string, userId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}/delete?userId=${userId}`
    );
  }

  updateResponse(
    commentId: string,
    responseId: string,
    response: CommentResponse,
    userId: number
  ): Observable<Comment> {
    return this.http.put<Comment>(
      `${this.apiUrl}/${commentId}/response/${responseId}/update?userId=${userId}`,
      response
    );
  }

  deleteResponse(
    commentId: string,
    responseId: string,
    userId: number
  ): Observable<Comment> {
    return this.http.delete<Comment>(
      `${this.apiUrl}/${commentId}/response/${responseId}/delete?userId=${userId}`
    );
  }
}
