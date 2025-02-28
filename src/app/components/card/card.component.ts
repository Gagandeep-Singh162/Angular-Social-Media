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
  }

  toggleComments(postId: number): void {
    debugger;
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

  GetIcons(post: any) {
    return post.user_id.toString() === localStorage.getItem('id');
  }
}
