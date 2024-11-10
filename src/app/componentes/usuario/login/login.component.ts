import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService,  private router: Router) {}

    ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });
    }
  
    onSubmit(): void {
      if (this.loginForm.valid) {
        const { email, password } = this.loginForm.value;
  
        this.authService.login(email, password).subscribe(
          (response) => {
            this.authService.setToken(response.token);

            if (this.authService.isAdmin()) {
              this.router.navigate(['/admin']);
            } else {
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          this.errorMessage = error.message || 'Error de autenticación';
          }
        );
      }
    }
}
