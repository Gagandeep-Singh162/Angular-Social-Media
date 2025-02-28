import { Component } from "@angular/core";
// import { UsersService } from '../../services/flask/users.service';
import { User, UserService } from "../../services/user.service";
// import Swal from 'sweetalert2';
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { SessionService } from "../../services/session.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
})
export class LoginComponent {
  isSignUp: boolean = false;
  registerForm: FormGroup;
  genders: any[] = [];
  provinces: any[] = [];
  showPassword: boolean = false;
  showLoginPassword: boolean = false;

  constructor(
    private sessionService: SessionService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private translate: TranslateService
  ) {
    this.registerForm = this.fb.group({
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        this.validateFullName,
      ]),
      email: ["", [Validators.required, Validators.email, this.validateEmail]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      phone: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]{10}$"),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      birthdate: ["", [Validators.required, this.minimumAgeValidator(16)]],
      province: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      status: [2],
    });
  }

  switchLanguage(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      const language = target.value;
      this.translate.use(language);
      localStorage.setItem("language", language);
    }
  }

  ngOnInit(): void {
    this.loadGenders();
    this.loadProvinces();
  }

  private loadGenders(): void {
    this.userService.getAllGenders().subscribe(
      (data) => (this.genders = data),
      (error) => console.error("Error loading genders:", error)
    );
  }

  private loadProvinces(): void {
    this.userService.getAllProvinces().subscribe(
      (data) => (this.provinces = data),
      (error) => console.error("Error loading provinces:", error)
    );
  }

  private validateEmail(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    if (!email) return null;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email) ? null : { invalidEmail: true };
  }

  private validateFullName(control: AbstractControl): ValidationErrors | null {
    const name = control.value;
    if (!name) return null;
    if (name.length < 3) return { invalidName: true };
    const regex =
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1\u00e1\u00e9\u00ed\u00f3\u00fa\u0020\u0027\u002E\u002D]*$/;
    return regex.test(name) ? null : { invalidName: true };
  }

  validateName(): void {
    const nameControl = this.registerForm.get("name");
    if (nameControl) {
      const value = nameControl.value;
      nameControl.setValue(value.replace(/[^a-zA-Z ]/g, ""), {
        emitEvent: false,
      });
    }
  }

  validatePhone(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, "");
  }

  minimumAgeValidator(minAge: number) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const birthdate = new Date(control.value);
      const today = new Date();
      let age = today.getFullYear() - birthdate.getFullYear();
      const monthDifference = today.getMonth() - birthdate.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthdate.getDate())
      ) {
        age--;
      }
      return age >= minAge ? null : { minimumAge: true };
    };
  }

  showSignUp(): void {
    this.isSignUp = true;
  }

  showSignIn(): void {
    this.isSignUp = false;
  }

  login(event: Event, email: string, password: string): void {
    event.preventDefault();
    this.translate
      .get([
        "auth.login.success_title",
        "auth.login.success_text",
        "auth.login.error_title",
        "auth.login.error_text",
      ])
      .subscribe((translations) => {
        this.userService.login(email, password).subscribe(
          (response) => {
            Swal.fire({
              icon: "success",
              title: translations["auth.login.success_title"],
              text: translations["auth.login.success_text"],
            });
            this.router.navigate(["/home"]);
          },
          (error) => {
            Swal.fire({
              icon: "error",
              title: translations["auth.login.error_title"],
              text: translations["auth.login.error_text"],
            });
            console.error("Login error:", error);
          }
        );
      });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleLoginPasswordVisibility(): void {
    this.showLoginPassword = !this.showLoginPassword;
  }

  onRegisterFormSubmit(event: Event): void {
    event.preventDefault();
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      const userObj: Partial<User> = {
        name: user.name,
        email: user.email,
        password: user.password,
        gender: user.gender,
        province: user.province,
        phone: user.phone,
        role: "user",
        status: '1',
        birthdate: user.birthdate,
      };

      this.userService.getVerifyExitsUser(user.email).subscribe((response) => {
        if (response.length > 0) {
          Swal.fire({
            icon: "error",
            title: "Registration error",
            text: "The email is already registered.",
          });
        } else {
          this.userService.createUser(user).subscribe(
            (response) => {
              Swal.fire({
                icon: "success",
                title: "Registration successful!",
                text: response.message,
              });
              this.showSignIn();
              this.registerForm.reset();
            },
            (registrationError) => {
              Swal.fire({
                icon: "error",
                title: "Registration error",
                text: "Please try again.",
              });
              console.error("Error:", registrationError);
            }
          );
        }
      });
    }
  }
}
