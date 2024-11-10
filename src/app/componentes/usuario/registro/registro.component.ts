import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;
  correoEnUso: boolean = false;

  constructor( private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  registrar() {
    if (this.registroForm.invalid) {
      return;
    }
    const usuario = this.registroForm.value;
    this.authService.register(usuario.nombre, usuario.apellidos, usuario.email, usuario.password)
      .subscribe(
        (response) => {
          console.log('Registro exitoso', response);
          this.router.navigate(['/home']);
        },
        (error) => {
          if (error.message === 'Este correo ya está registrado.') {
            this.correoEnUso = true; 
          console.error('Error al registrar', error);
        }
      }
      );
  }
}
