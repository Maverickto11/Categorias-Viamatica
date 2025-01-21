import { Component, Input, OnInit } from '@angular/core';
import { ComentarioService } from '../../services/comentario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css'
})
export class ComentariosComponent implements OnInit{
  @Input() publicacionId!: number;
  comentarios: any[] = [];
  nuevoComentario: string = '';

  constructor(private comentarioService: ComentarioService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.publicacionId = +params['id'];  
      this.getComentarios();
    });
  }


  getComentarios(): void {
    this.comentarioService.getComentarios(this.publicacionId).subscribe(
      (data) => (this.comentarios = data),
      (error) => console.error('Error al obtener comentarios:', error)
    );
  }

  agregarComentario(): void {
    if (!this.nuevoComentario.trim()) return; // Evita enviar comentarios vacíos
  
    this.comentarioService.createComentario(this.publicacionId, this.nuevoComentario).subscribe({
      next: () => {
        this.nuevoComentario = ''; // Limpiar el campo de texto
        this.getComentarios(); // Obtener los comentarios actualizados
      },
      error: (err) => {
        console.error('Error al agregar comentario:', err);
      }
    });
  }
  
  /*agregarComentario(): void {
    
    if (!this.nuevoComentario.trim()) return;

    this.comentarioService.createComentario(this.publicacionId, this.nuevoComentario).subscribe(
      (data) => {
        this.comentarios.push(data);
        this.nuevoComentario = '';
      },
      (error) => console.error('Error al agregar comentario:', error)
    );
  }
*/
  editarComentario(comentario: any): void {
    const nuevoContenido = prompt('Edita tu comentario:', comentario.Contenido);
    if (nuevoContenido !== null) {
      this.comentarioService.editComentario(comentario.Id, nuevoContenido).subscribe(
        (data) => {
          comentario.Contenido = nuevoContenido;
        },
        (error) => console.error('Error al editar comentario:', error)
      );
    }
  }

  eliminarComentario(comentarioId: number): void {
    if (confirm('¿Estás seguro de eliminar este comentario?')) {
      this.comentarioService.deleteComentario(comentarioId).subscribe(
        () => {
          this.comentarios = this.comentarios.filter((c) => c.Id !== comentarioId);
        },
        (error) => console.error('Error al eliminar comentario:', error)
      );
    }
  }
}