import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Publicacion } from '../../interfaces/Publicacion';
import { PublicacionServiceService } from '../../services/publicacion-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  publicaciones: any[] = [];
  nuevaPublicacion: any = { Titulo: '', Contenido: '', CategoriaId: 0 };
  editarPublicacion: any = { Titulo: '', Contenido: '', CategoriaId: 0 };
  publicacionIdEdicion: number | null = null;

  categoriaId: any;
  constructor(private publicacionService: PublicacionServiceService, private route: ActivatedRoute,
  ) { }

  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoriaId = +params['id'];  
      this.obtenerTodasPublicaciones();  
    });
  }


  obtenerPublicaciones(): void {
 
    this.publicacionService.getPublicacionesPorCategoria(this.categoriaId).subscribe(
      (data) => {
        this.publicaciones = data;  
      },
      (error) => {
        console.error('Error al obtener publicaciones:', error);
      }
    );
  }


  obtenerTodasPublicaciones(): void {
    this.publicacionService.getTodasPublicaciones().subscribe({
      next: (data) => {
        this.publicaciones = data;
      },
      error: (err) => {
        console.error('Error al obtener todas las publicaciones:', err);
      }
    });
  }

  crearPublicacion(): void {
    this.publicacionService.createPublicacion(this.nuevaPublicacion).subscribe({
      next: (data) => {
        this.publicaciones.push(data); 
        this.nuevaPublicacion = { Titulo: '', Contenido: '', CategoriaId: 0 };  
      },
      error: (err) => {
        console.error('Error al crear la publicación:', err);
      }
    });
  }


  editarPublicacions(publicacion: any): void {
    const nuevoTitulo = prompt('Edita el título de la publicación:', publicacion.Titulo);
    const nuevoContenido = prompt('Edita el contenido de la publicación:', publicacion.Contenido);
  
    if (nuevoTitulo !== null && nuevoContenido !== null) {
      const actualizadaPublicacion = {
        Titulo: nuevoTitulo,
        Contenido: nuevoContenido,
      };
  
      this.publicacionService.editPublicacion(publicacion.Id, actualizadaPublicacion).subscribe(
        (response: any) => {
          // Actualiza la publicación en el array local utilizando la respuesta del backend
          const index = this.publicaciones.findIndex(pub => pub.Id === publicacion.Id);
          if (index !== -1) {
            this.publicaciones[index].Titulo = response.publicacion.Titulo;
            this.publicaciones[index].Contenido = response.publicacion.Contenido;
          }
        },
        (error) => {
          console.error('Error al editar la publicación:', error);
        }
      );
    }
  }
  
  
    

  eliminarPublicacion(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
      this.publicacionService.deletePublicacion(id).subscribe({
        next: () => {
          this.publicaciones = this.publicaciones.filter(pub => pub.Id !== id); 
        },
        error: (err) => {
          console.error('Error al eliminar la publicación:', err);
        }
      });
    }
  }

  iniciarEdicion(publicacion: any): void {
    this.publicacionIdEdicion = publicacion.Id;  
   // this.editarPublicacion = { ...publicacion };
  }
  
  
}