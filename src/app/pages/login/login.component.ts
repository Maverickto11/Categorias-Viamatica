import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  credenciales = {
    Correo: '',
    Contrasena: '',
  };
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.credenciales).subscribe(
      (response) => {
        if (response.token) {
          this.authService.guardarToken(response.token);
          this.router.navigate(['/registro']); // Cambia '/dashboard' por la ruta deseada
        } else {
          this.error = 'Error inesperado al iniciar sesión.';
        }
      },
      (error) => {
        this.error = error.error.message || 'Credenciales incorrectas.';
      }
    );
  }
}