// user-form-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { UserService, User } from '../../services/user.service';

export interface UserFormDialogData {
  user?: User;
}

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class UserFormDialogComponent implements OnInit {
  form: FormGroup;
  provinces: any[] = [];
  genders: any[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserFormDialogData
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      birthdate: ['', Validators.required],
      province: ['', Validators.required],
      gender: ['', Validators.required],
      status: [1, Validators.required],
      role: ['user', Validators.required],
    });

    // If editing an existing user, patch the form with existing data
    if (this.data.user) {
      this.form.patchValue(this.data.user);
    }
  }

  ngOnInit() {
    debugger;
    this.userService
      .getAllProvinces()
      .subscribe((provinces) => (this.provinces = provinces));
    this.userService
      .getAllGenders()
      .subscribe((genders) => (this.genders = genders));
    if (this.data.user) {
      this.form.patchValue(this.data.user);
    }
  }

  onSave() {
    if (this.form.valid) {
      const userData = this.form.value as User;
      if (this.data.user) {
        const updatedUser = { ...this.data.user, ...userData };
        this.userService.updateUser(updatedUser).subscribe((result) => {
          this.dialogRef.close(result);
        });
      } else {
        this.userService.createUser(userData).subscribe((result) => {
          this.dialogRef.close(result);
        });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
