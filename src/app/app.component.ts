import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistroComponent } from "./pages/registro/registro.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegistroComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Categorias-Viamatica';
}
