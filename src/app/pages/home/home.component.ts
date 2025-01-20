import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Publicacion } from '../../interfaces/Publicacion';
import { PublicacionServiceService } from '../../services/publicacion-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  publicaciones: Publicacion[] = [];
  publicacion: Publicacion = { id: 0, titulo: '', contenido: '', categoriaId: 0 };
  isEditing: boolean = false;

  constructor(private publicacionService: PublicacionServiceService) {}

  ngOnInit(): void {
    this.loadPublicaciones();
  }

  // Cargar las publicaciones
  loadPublicaciones(): void {
    this.publicacionService.getPublicaciones().subscribe(
      (data) => {
        this.publicaciones = data;
      },
      (error) => {
        console.error('Error al cargar publicaciones', error);
      }
    );
  }

  // Crear una nueva publicación
  createPublicacion(): void {
    if (this.publicacion.titulo && this.publicacion.contenido) {
      this.publicacionService.createPublicacion(this.publicacion).subscribe(
        (data) => {
          this.loadPublicaciones();  // Recargar las publicaciones después de crear una nueva
          this.resetForm();
        },
        (error) => {
          console.error('Error al crear publicación', error);
        }
      );
    }
  }

  // Editar una publicación
  editPublicacion(id: number): void {
    this.publicacionService.editPublicacion(id, this.publicacion).subscribe(
      (data) => {
        this.loadPublicaciones();  // Recargar las publicaciones después de editar
        this.resetForm();
        this.isEditing = false;
      },
      (error) => {
        console.error('Error al editar publicación', error);
      }
    );
  }

  // Eliminar una publicación
  deletePublicacion(id: number): void {
    this.publicacionService.deletePublicacion(id).subscribe(
      (data) => {
        this.loadPublicaciones();  // Recargar las publicaciones después de eliminar
      },
      (error) => {
        console.error('Error al eliminar publicación', error);
      }
    );
  }

  // Resetea el formulario
  resetForm(): void {
    this.publicacion = { id: 0, titulo: '', contenido: '', categoriaId: 0 };
    this.isEditing = false;
  }

  // Establecer un formulario para editar
  setEditForm(publicacion: Publicacion): void {
    this.publicacion = { ...publicacion };
    this.isEditing = true;
  }
}