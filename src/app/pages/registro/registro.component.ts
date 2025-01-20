import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  usuario = {
    nombre: '',
    correo: '',
    contrasena: '',
  };

  constructor(private authService: AuthService) {}


  onSubmit() {
    this.authService.registrarUsuario(this.usuario).subscribe(
      (response) => {
        console.log('Usuario registrado:', response);
        alert('Usuario registrado exitosamente.');
      },
      (error) => {
        console.error('Error en el registro:', error);
        alert(error.error.message || 'Ocurrió un error en el registro.');
      }
    );
  }
}
