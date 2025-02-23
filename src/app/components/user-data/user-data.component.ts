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
import { TranslateModule } from '@ngx-translate/core';
import { User, UserService } from '../../services/user.service';

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
    TranslateModule
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

  constructor(private userService: UserService) {}

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
    this.userService.deleteUser(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (user) => user.id !== id
      );
      this.totalUsers = this.dataSource.data.length;
    });
  }

  addUser(): void {
    const newUser: Partial<User> = {
      name: 'New User',
      email: 'newuser@example.com',
      phone: '1234567890',
      birthdate: '2000-01-01',
      status: 1,
    };
    this.userService.addUser(newUser).subscribe((addedUser) => {
      this.dataSource.data = [...this.dataSource.data, addedUser];
      this.totalUsers = this.dataSource.data.length;
    });
  }
}
