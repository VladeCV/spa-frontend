import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ButtonDirective} from "primeng/button";
import {ListaClienteComponent} from "./features/cliente/lista/lista-cliente.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonDirective, ListaClienteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sap-frontend';
}
