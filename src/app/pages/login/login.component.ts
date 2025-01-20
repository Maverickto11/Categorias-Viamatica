import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Token } from '@angular/compiler';
import { LoginResponse } from '../../interfaces/LoginResponse';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  credentials = {
    correo: '',
    contrasena: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (response: any) => {

        if (response && response.Token) {
          console.log('Token recibido:', response.Token);

          localStorage.setItem('token', response.Token);

          this.router.navigate(['/categorias']);
        } else {
          console.error('No se recibió un token válido:', response);
        }
      },
      error: (err: any) => {
        console.error('Error al iniciar sesión:', err);
        alert('Credenciales incorrectas. Por favor, intente de nuevo.');
      }
    });
  }
}