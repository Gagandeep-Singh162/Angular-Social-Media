import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PostService } from '../../services/post.service';
import Swal from 'sweetalert2';
import { SessionService } from '../../services/session.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from '../../services/category.service';
import { NewPostService } from '../../services/new-post.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @ViewChild('postForm') postForm!: NgForm;
  post = {
    title: '',
    content: '',
    user_id: 0,
    category_id: 0,
    image: undefined as File | undefined,
  };
  imagePreview: string | ArrayBuffer | null = null;
  currentUser: any;
  categories: any[] = [];

  constructor(
    private sessionService: SessionService,
    private categoryService: CategoryService,
    private postService: PostService,
    private newPostService: NewPostService // Inject the new service
  ) {}

  ngOnInit(): void {
    this.currentUser = this.sessionService.getUser();
    if (this.currentUser) {
      this.post.user_id = this.currentUser.id; // Adjust the user ID based on your session logic
    }
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (categories) => {
        this.categories = categories;
        // Set a default category if necessary
        if (this.categories.length > 0) {
          this.post.category_id = this.categories[0].id;
        }
      },
      (error) => {
        console.error('Error loading categories', error);
        Swal.fire(
          'Error',
          'There was a problem loading the categories',
          'error'
        );
      }
    );
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files![0];
    if (file) {
      this.post.image = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('title', this.post.title);
    formData.append('content', this.post.content);
    formData.append('user_id', this.post.user_id.toString());
    formData.append('category_id', this.post.category_id.toString());
    if (this.post.image) {
      formData.append('image', this.post.image);
    }
    this.postService.createPost(formData).subscribe(
      (response) => {
        console.log('Post created successfully', response);
        Swal.fire('Success!', 'The post was created successfully', 'success');
        // Clear form after success
        this.resetForm(form);
        this.newPostService.notifyPostCreated(); // Notify that a new post has been created
      },
      (error) => {
        console.error('Error creating post', error);
        Swal.fire('Error', 'There was a problem creating the post', 'error');
      }
    );
  }

  clearImagePreview(): void {
    this.imagePreview = null;
    this.post.image = undefined;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.onFileSelected({ target: { files: [file] } } as unknown as Event);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  private resetForm(form: NgForm): void {
    form.resetForm();
    this.post = {
      title: '',
      content: '',
      user_id: this.currentUser.id,
      category_id: 0,
      image: undefined,
    };
    this.imagePreview = null;
  }

  onCancel(): void {
    this.resetForm(this.postForm);
  }
}
