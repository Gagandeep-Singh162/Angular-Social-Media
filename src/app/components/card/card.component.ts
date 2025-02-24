import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommentsComponent } from '../comments/comments.component';
import { TranslateModule } from '@ngx-translate/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    CommentsComponent,
    TranslateModule,
  ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  posts: any[] = [];
  expandedPostId: number | null = null;
  editingPost: any | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  currentUser: any = { id: 1, name: 'Current User' }; // Simulating user

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getAllPosts().subscribe((data: any[]) => {
      this.posts = data;
    });

    // if (storedPosts) {
    //   this.posts = JSON.parse(storedPosts);
    // } else {
    //   // Hardcoded initial data
    //   this.posts = [
    //     {
    //       id: 1,
    //       user_id: 1,
    //       title: 'First Post',
    //       content: 'This is the content of the first post.',
    //       category_id: 1,
    //       num_likes: 10,
    //       num_comments: 5,
    //       time_created: '2023-10-01T10:00:00Z',
    //       created_at: '2023-10-01T10:00:00Z',
    //       updated_at: '2023-10-01T10:00:00Z',
    //       image: 'https://picsum.photos/800/400',
    //       userLiked: false,
    //     },
    //     {
    //       id: 2,
    //       user_id: 2,
    //       title: 'Second Post',
    //       content: 'This is the content of the second post.',
    //       category_id: 2,
    //       num_likes: 3,
    //       num_comments: 2,
    //       time_created: '2023-10-02T12:30:00Z',
    //       created_at: '2023-10-02T12:30:00Z',
    //       updated_at: '2023-10-02T12:30:00Z',
    //       image: null,
    //       userLiked: false,
    //     },
    //     {
    //       id: 3,
    //       user_id: 3,
    //       title: 'Third Post',
    //       content: 'This is the content of the third post.',
    //       category_id: 2,
    //       num_likes: 5,
    //       num_comments: 3,
    //       time_created: '2023-10-02T14:00:00Z',
    //       created_at: '2023-10-02T14:00:00Z',
    //       updated_at: '2023-10-02T14:00:00Z',
    //       image: 'https://picsum.photos/700/400',
    //       userLiked: false,
    //     },
    //     {
    //       id: 4,
    //       user_id: 4,
    //       title: 'Fourth Post',
    //       content: 'This is the content of the fourth post.',
    //       category_id: 3,
    //       num_likes: 7,
    //       num_comments: 1,
    //       time_created: '2023-10-03T09:45:00Z',
    //       created_at: '2023-10-03T09:45:00Z',
    //       updated_at: '2023-10-03T09:45:00Z',
    //       image: 'https://picsum.photos/600/400',
    //       userLiked: false,
    //     },
    //     {
    //       id: 5,
    //       user_id: 5,
    //       title: 'Fifth Post',
    //       content: 'This is the content of the fifth post.',
    //       category_id: 1,
    //       num_likes: 12,
    //       num_comments: 6,
    //       time_created: '2023-10-04T16:20:00Z',
    //       created_at: '2023-10-04T16:20:00Z',
    //       updated_at: '2023-10-04T16:20:00Z',
    //       image: null,
    //       userLiked: false,
    //     },
    //   ];

    //   // Save to local storage for persistence
    //   this.savePosts();
    // }

    // if (!localStorage.getItem('users')) {
    //   const users: any[] = [
    //     { id: 1, name: 'Alice' },
    //     { id: 2, name: 'Bob' },
    //     { id: 3, name: 'James' },
    //     { id: 4, name: 'Hoan' },
    //     { id: 5, name: 'Matt' },
    //   ];
    //   localStorage.setItem('users', JSON.stringify(users));
    // }

    // if (!localStorage.getItem('categories')) {
    //   const categories: any[] = [
    //     { id: 1, name: 'Angular' },
    //     { id: 2, name: 'TypeScript' },
    //     { id: 3, name: 'React' },
    //     { id: 4, name: 'Js' },
    //     { id: 5, name: '.Net' },
    //   ];
    //   localStorage.setItem('categories', JSON.stringify(categories));
    // }

    // if (!localStorage.getItem('comments')) {
    //   const comments: any[] = [
    //     { id: 1, post_id: 1, user_id: 2, content: 'Great post!' },
    //     { id: 2, post_id: 2, user_id: 1, content: 'Thanks for sharing!' },
    //     { id: 3, post_id: 3, user_id: 1, content: 'Thanks for sharing!' },
    //     { id: 4, post_id: 2, user_id: 1, content: 'Thanks for sharing!' },
    //     { id: 5, post_id: 3, user_id: 1, content: 'Thanks for sharing!' },
    //   ];
    //   localStorage.setItem('comments', JSON.stringify(comments));
    // }

    // if (!localStorage.getItem('likes')) {
    //   const likes: any[] = [
    //     { id: 1, post_id: 1, userId: 1 },
    //     { id: 2, post_id: 2, userId: 2 },
    //     { id: 3, post_id: 3, userId: 2 },
    //     { id: 4, post_id: 3, userId: 2 },
    //   ];
    //   localStorage.setItem('likes', JSON.stringify(likes));
    // }
  }

  toggleComments(postId: number): void {
    this.expandedPostId = this.expandedPostId === postId ? null : postId;
  }

  expandImage(post: any): void {
    post.isImageExpanded = true;
  }

  closeImage(post: any): void {
    post.isImageExpanded = false;
  }

  startEdit(post: any): void {
    this.editingPost = { ...post };
    this.imagePreview = post.image ? post.image : null;
  }

  cancelEdit(): void {
    this.editingPost = null;
    this.imagePreview = null;
  }

  confirmDelete(postId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone. Do you want to delete this post?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletePost(postId);
      }
    });
  }

  deletePost(postId: number): void {
    this.postService.deletePost(postId).subscribe({
      next: (response) => {
        Swal.fire('Deleted!', 'The post has been deleted.', 'success');
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Post deletion error',
          text: 'Please try again.',
        });
      },
    });
  }

  toggleLike(post: any): void {
    post.userLiked = !post.userLiked;
    post.num_likes += post.userLiked ? 1 : -1;
    this.postService.updatePost(post.id, post).subscribe({
      next: (response) => {
        console.log('Post updated successfully', response);
      },
      error: (error) => {
        console.error('Error updating post:', error);
      },
    });
  }

  updateCommentCount(post: any, count: number): void {
    post.num_comments = count;
    // this.savePosts();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        if (this.editingPost) {
          this.editingPost.image = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
