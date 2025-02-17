import { Injectable } from '@angular/core';
import { Post, User, Category, Comment, Like } from '../Models/PostModels';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {
    this.initializeData();
  }

  initializeData() {
    if (!localStorage.getItem('posts')) {
      const posts: Post[] = [
        {
          id: 1,
          user_id: 1,
          title: 'First Post',
          content: 'This is the content of the first post.',
          category_id: 1,
          num_likes: 10,
          num_comments: 5,
          time_created: '2023-10-01T10:00:00Z',
          created_at: '2023-10-01T10:00:00Z',
          updated_at: '2023-10-01T10:00:00Z',
          image: 'https://picsum.photos/800/400',
          userLiked: false,
        },
        {
          id: 2,
          user_id: 2,
          title: 'Second Post',
          content: 'This is the content of the second post.',
          category_id: 2,
          num_likes: 3,
          num_comments: 2,
          time_created: '2023-10-02T12:30:00Z',
          created_at: '2023-10-02T12:30:00Z',
          updated_at: '2023-10-02T12:30:00Z',
          image: null,
          userLiked: false,
        },
        {
          id: 3,
          user_id: 3,
          title: 'Third Post',
          content: 'This is the content of the third post.',
          category_id: 2,
          num_likes: 5,
          num_comments: 3,
          time_created: '2023-10-02T14:00:00Z',
          created_at: '2023-10-02T14:00:00Z',
          updated_at: '2023-10-02T14:00:00Z',
          image: 'https://picsum.photos/700/400',
          userLiked: false,
        },
        {
          id: 4,
          user_id: 4,
          title: 'Fourth Post',
          content: 'This is the content of the fourth post.',
          category_id: 3,
          num_likes: 7,
          num_comments: 1,
          time_created: '2023-10-03T09:45:00Z',
          created_at: '2023-10-03T09:45:00Z',
          updated_at: '2023-10-03T09:45:00Z',
          image: 'https://picsum.photos/600/400',
          userLiked: false,
        },
        {
          id: 5,
          user_id: 5,
          title: 'Fifth Post',
          content: 'This is the content of the fifth post.',
          category_id: 1,
          num_likes: 12,
          num_comments: 6,
          time_created: '2023-10-04T16:20:00Z',
          created_at: '2023-10-04T16:20:00Z',
          updated_at: '2023-10-04T16:20:00Z',
          image: null,
          userLiked: false,
        },
      ];
      localStorage.setItem('posts', JSON.stringify(posts));
    }

    if (!localStorage.getItem('users')) {
      const users: User[] = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'James' },
        { id: 4, name: 'Hoan' },
        { id: 5, name: 'Matt' },
      ];
      localStorage.setItem('users', JSON.stringify(users));
    }

    if (!localStorage.getItem('categories')) {
      const categories: Category[] = [
        { id: 1, name: 'Angular' },
        { id: 2, name: 'TypeScript' },
        { id: 3, name: 'React' },
        { id: 4, name: 'Js' },
        { id: 5, name: '.Net' },
      ];
      localStorage.setItem('categories', JSON.stringify(categories));
    }

    if (!localStorage.getItem('comments')) {
      const comments: Comment[] = [
        { id: 1, post_id: 1, user_id: 2, content: 'Great post!' },
        { id: 2, post_id: 2, user_id: 1, content: 'Thanks for sharing!' },
        { id: 3, post_id: 3, user_id: 1, content: 'Thanks for sharing!' },
        { id: 4, post_id: 2, user_id: 1, content: 'Thanks for sharing!' },
        { id: 5, post_id: 3, user_id: 1, content: 'Thanks for sharing!' },
      ];
      localStorage.setItem('comments', JSON.stringify(comments));
    }

    if (!localStorage.getItem('likes')) {
      const likes: Like[] = [
        { id: 1, post_id: 1, userId: 1 },
        { id: 2, post_id: 2, userId: 2 },
        { id: 3, post_id: 3, userId: 2 },
        { id: 4, post_id: 3, userId: 2 },
      ];
      localStorage.setItem('likes', JSON.stringify(likes));
    }
  }

  getPosts(): Post[] {
    return JSON.parse(localStorage.getItem('posts') || '[]');
  }

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  getCategories(): Category[] {
    return JSON.parse(localStorage.getItem('categories') || '[]');
  }

  getComments(): Comment[] {
    return JSON.parse(localStorage.getItem('comments') || '[]');
  }

  getLikes(): Like[] {
    return JSON.parse(localStorage.getItem('likes') || '[]');
  }
}
