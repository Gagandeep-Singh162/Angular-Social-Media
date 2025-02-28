import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { User, UserService } from '../../services/user.service';
import { UserFormDialogComponent } from '../user-form-dialog/user-form-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginator,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    TranslateModule,
  ],
})
export class UserDataComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'name',
    'email',
    'phone',
    'birthdate',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<User>();
  totalUsers = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20];
  pageIndex = 0;
  searchValue = '';

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.dataSource.data = users;
      this.totalUsers = users.length;
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id: number): void {
    this.translate
      .get([
        'delete_confirm.title',
        'delete_confirm.text',
        'delete_confirm.confirm_button',
        'delete_confirm.cancel_button',
        'delete_success.title',
        'delete_success.text',
        'delete_error.title',
        'delete_error.text',
      ])
      .subscribe((translations) => {
        Swal.fire({
          title: translations['delete_confirm.title'],
          text: translations['delete_confirm.text'],
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: translations['delete_confirm.confirm_button'],
          cancelButtonText: translations['delete_confirm.cancel_button'],
        }).then((result) => {
          if (result.isConfirmed) {
            this.userService.deleteUser(id).subscribe({
              next: () => {
                this.dataSource.data = this.dataSource.data.filter(
                  (user) => user.id !== id
                );
                this.totalUsers = this.dataSource.data.length;
                Swal.fire(
                  translations['delete_success.title'],
                  translations['delete_success.text'],
                  'success'
                );
              },
              error: () => {
                Swal.fire(
                  translations['delete_error.title'],
                  translations['delete_error.text'],
                  'error'
                );
              },
            });
          }
        });
      });
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      data: { user },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.dataSource.data.findIndex((u) => u.id === result.id);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource._updateChangeSubscription();
        }
      }
    });
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      data: {},
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = [...this.dataSource.data, result];
        this.totalUsers = this.dataSource.data.length;
      }
    });
  }
}
